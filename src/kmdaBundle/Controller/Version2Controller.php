<?php

namespace kmdaBundle\Controller;

//use kmdaBundle\Repository\VotingDtpRepository;
use kmdaBundle\Entity\VotingDtp;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use kmdaBundle\Entity\OrendaDoc;
use kmdaBundle\Form\OrendaDocType;
use kmdaBundle\WorkFlow\Model\OrendaDocModel;
/**
 * Documents controller.
 *
 */
class Version2Controller extends Controller
{
    /**
     * Lists all Documents entities.
     *
     */
    public function indexAction()
    {
        $votingResultAll = $this->votingResult();
//        $orendaDoc = new OrendaDoc();
//        $form = $this->createForm('kmdaBundle\Form\OrendaDocType', $orendaDoc);
//        unset($orendaDoc);
//        unset($form);
//        if(($this->getUser()->getUsername()=='secretar')||($this->getUser()->getUsername()=='golova')) {
//            return $this->redirectToRoute('orendaresh_index');
//        }
//        $orendaDoc = new OrendaDoc();
//        $form = $this->createForm('kmdaBundle\Form\OrendaDocType', $orendaDoc);   
        
        $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');        
        $em = $this->getDoctrine()->getManager();
        $orendaDocs = $em->getRepository('kmdaBundle:OrendaDoc')->findAll();

        $count=0;
        foreach ($orendaDocs as $orendaDoc) {
            $model = new OrendaDocModel($orendaDoc);
            if ($processHandler->getCurrentState($model)) {
                if (($processHandler->getCurrentState($model)->getStepName() == "application_created") && $processHandler->getCurrentState($model)->getSuccessful()) {
                    $count++;
                }
            }
        }

        
        return $this->render('@kmda/Default/version2/index.html.twig', array(
//            'form' => $form->createView(),
            'count' => $count,
            'votingResultAll' => $votingResultAll
        ));
    }
    private function votingResult(){

        $em = $this->getDoctrine()->getManager();
        $votingResultAll = $em->getRepository('kmdaBundle:VotingDtp')->votingResultAll();
        return $votingResultAll;

    }
    
    public function maplinkAction(Request $request) {
        $zoom = $request->get('zoom');
        $x = $request->get('x');
        $y = $request->get('y');
        return $this->render('@kmda/Default/version2/index.html.twig');
    }

    public function setlangAction(Request $request) {
        if($request->get('lang')=='en') {
            $this->get('translator')->setLocale('en');
            $this->get('translator')->setFallbackLocales(array('en'));
            $this->get('session')->set('_locale', 'en');
        } else {
            $this->get('translator')->setLocale('uk');
            $this->get('translator')->setFallbackLocales(array('uk'));
            $this->get('session')->set('_locale', 'uk');
        }
        return new JsonResponse($this->get('translator')->getLocale(),200);
    }
}
