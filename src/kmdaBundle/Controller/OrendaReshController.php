<?php

namespace kmdaBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use kmdaBundle\Entity\OrendaResh;
use kmdaBundle\Form\OrendaReshType;
use kmdaBundle\Entity\OrendaDoc;
use Symfony\Component\HttpFoundation\Response;
use kmdaBundle\WorkFlow\Model\OrendaDocModel;
// use Symfony\Component\Validator\Constraints\DateTime;
/**
 * OrendaResh controller.
 *
 */
class OrendaReshController extends Controller {

    /**
     * Lists all OrendaResh entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();
        $orendaDocs = $em->getRepository('kmdaBundle:OrendaDoc')->findAll();
        $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');
        $notwork = array();
        foreach ($orendaDocs as $orendaDoc) {
            $model = new OrendaDocModel($orendaDoc);
            if ($processHandler->getCurrentState($model)) {
                if ((($processHandler->getCurrentState($model)->getStepName() == "application_created") || ($processHandler->getCurrentState($model)->getStepName() == "deleted")) && $processHandler->getCurrentState($model)->getSuccessful()) {
                    $notwork[]=$orendaDoc;
                }
            }
        }
        $new = $em->getRepository('kmdaBundle:OrendaResh')->createQueryBuilder('m')->where('m.title is NULL')->getQuery()
          ->getResult();
        $open = $em->getRepository('kmdaBundle:OrendaResh')->createQueryBuilder('m')->where('m.title is not NULL')->andwhere('m.closed is NULL')->getQuery()
          ->getResult();    
        $close = $em->getRepository('kmdaBundle:OrendaResh')->createQueryBuilder('m')->where('m.closed is not NULL')->getQuery()
          ->getResult();        
        return $this->render('orendaresh/meetings.html.twig', array(
                    'open' => $open,
                    'close' => $close,
                    'new' => $new,
                    'notwork' =>$notwork
        ));
    }

    /**
     * Creates a new OrendaResh entity.
     *
     */
    public function newAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $orendaResh = new OrendaResh();

        $orendaDocs = $em->getRepository('kmdaBundle:OrendaDoc')->findAll();
//        $query = $em->createQuery('select od from kmdaBundle:OrendaDoc od where od.agreem1 = false OR od.agreem2 = false order by od.tip');
//        $orendaDocs = $query->getResult();
        $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');
        foreach ($orendaDocs as $orendaDoc) {
            $model = new OrendaDocModel($orendaDoc);
            if ($processHandler->getCurrentState($model)) {
                if ((($processHandler->getCurrentState($model)->getStepName() == "application_created") || ($processHandler->getCurrentState($model)->getStepName() == "deleted")) && $processHandler->getCurrentState($model)->getSuccessful()) {
                    $orendaResh->addOrendadoc($orendaDoc);
                    
                }
            }
        }
        $em->persist($orendaResh);

        $form = $this->createForm('kmdaBundle\Form\OrendaReshType', $orendaResh);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if(count($orendaResh->getOrendadoc()) > 0) {

//                //               var_dump($processHandler->getCurrentState($model)->getStepName());die;
//                if ($processHandler->getCurrentState($model)->getStepName() == "draft_created") {
//                    if ($orendaDoc->getAgreem1()==1) {
//                        $modelState = $processHandler->reachNextState($model, 'agreement1');
//                        if (!$modelState->getSuccessful()) {
//                            throw $this->createNotFoundException('не авторизованное действие.');
//                        }
//                        $model->setStatus(\kmdaBundle\Entity\OrendaDoc::STATUS_AGREEMENT1);
//                        $orendaDoc->setAgreem2(false);
//                    } 
//                    if ($orendaDoc->getAgreem2()==1) {
//                        throw $this->createNotFoundException('не авторизованное действие.');
//                    }                     
//                } elseif ($processHandler->getCurrentState($model)->getStepName() == "agreement1") {
//                    $orendaDoc->setAgreem1(true);
//                    if ($orendaDoc->getAgreem2()==1) {
//                        $modelState = $processHandler->reachNextState($model, 'agreement2');
//                        $model->setStatus(\kmdaBundle\Entity\OrendaDoc::STATUS_AGREEMENT2);
//                        if (!$modelState->getSuccessful()) {
//                            throw $this->createNotFoundException('не авторизованное действие.');
//                        }
//                    }
//                }
//                else {
//                    $modelState = $processHandler->start($model);
//                }
//            }
                foreach($orendaResh->getOrendadoc() as $orendaDoc) {
                    $model = new OrendaDocModel($orendaDoc);
                    $processHandler->reachNextState($model, 'used', true);
//                    $em->persist($orendaDoc);
                }

            $em->persist($orendaResh);
            $em->flush();
            }
            return $this->redirectToRoute('kmda_homepage');
        }

        return $this->render('kmdaBundle:OrendaResh:meeting_create.html.twig', array(
                    'orendaResh' => $orendaResh,
                    'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a OrendaResh entity.
     *
     */
    public function showAction(OrendaResh $orendaResh) {
        $deleteForm = $this->createDeleteForm($orendaResh);

        return $this->render('orendaresh/show.html.twig', array(
                    'orendaResh' => $orendaResh,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing OrendaResh entity.
     *
     */
    public function editAction(Request $request, OrendaResh $orendaResh) {
        //  $deleteForm = $this->createDeleteForm($orendaResh);
        $editForm = $this->createForm('kmdaBundle\Form\OrendaReshGolovaType', $orendaResh);
        $editForm->handleRequest($request);

        $em = $this->getDoctrine()->getManager();
        if ($editForm->isSubmitted() && $editForm->isValid() && ($this->get('security.context')->isGranted('ROLE_GOLOVA'))) {

            $orendaDocs = $orendaResh->getOrendadoc();
            if(count($orendaDocs) > 0) {
            $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');

            foreach ($orendaDocs as $orendaDoc) {
                $model = new OrendaDocModel($orendaDoc);
                if ($processHandler->reachNextState($model, 'published')) {
                    $model->setStatus(\kmdaBundle\WorkFlow\Model\OrendaDocModel::STATUS_PUBLISHED);
                    $em->persist($orendaDoc);
                } else {
                    throw $this->createNotFoundException('об\'єкт не знайдено');
                }
            }

            $em->persist($orendaResh);
            $em->flush();
            }
            return $this->redirectToRoute('orendaresh_index'); //, array('id' => $orendaResh->getId()));
        }

        return $this->render('kmdaBundle:OrendaResh:meeting_edit.html.twig', array(
                    'orendaResh' => $orendaResh,
                    'form' => $editForm->createView(),
                        //        'delete_form' => $deleteForm->createView(),
        ));
    }

    public function secretaryeditAction(Request $request, OrendaResh $orendaResh) {
        //  $deleteForm = $this->createDeleteForm($orendaResh);
        $editForm = $this->createForm('kmdaBundle\Form\OrendaReshSolutionType', $orendaResh);

        $editForm->handleRequest($request);

        $em = $this->getDoctrine()->getManager();
        if ($editForm->isSubmitted() && $editForm->isValid() && ($this->get('security.context')->isGranted('ROLE_SECRETAR') || $this->get('security.context')->isGranted('ROLE_GOLOVA'))) {

            $orendaDocs = $orendaResh->getOrendadoc();
            $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');

            foreach ($orendaDocs as $orendaDoc) {
                $model = new OrendaDocModel($orendaDoc);
                if (($orendaDoc->getSolution() == 1) || ($orendaDoc->getSolution() == 2)|| ($orendaDoc->getSolution() == 3)) {
                    if ($processHandler->reachNextState($model, 'application_closed')) {
                        $model->setStatus(\kmdaBundle\WorkFlow\Model\OrendaDocModel::STATUS_AGREEMENT);
                        $em->persist($orendaDoc);
                    } else {
                        throw $this->createNotFoundException('об\'єкт не знайдено');
                    }
                } else {
                    if ($processHandler->reachNextState($model, 'deleted')) {
                        $model->setStatus(\kmdaBundle\WorkFlow\Model\OrendaDocModel::STATUS_DELETED);
                        $em->persist($orendaDoc);
                    } else {
                        throw $this->createNotFoundException('об\'єкт не знайдено');
                    }                    
                }
            }
            $closeddate= new \DateTime('now');
            $orendaResh->setClosed($closeddate);
            $em->persist($orendaResh);
            $em->flush();

            return $this->redirectToRoute('orendaresh_index'); //, array('id' => $orendaResh->getId()));
        }

        return $this->render('kmdaBundle:OrendaResh:secretarymeeting_edit.html.twig', array(
                    'orendaResh' => $orendaResh,
                    'form' => $editForm->createView(),
                        //        'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a OrendaResh entity.
     *
     */
    public function deleteAction(Request $request, OrendaResh $orendaResh) {
        $form = $this->createDeleteForm($orendaResh);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($orendaResh);
            $em->flush();
        }

        return $this->redirectToRoute('orendaresh_index');
    }

    /**
     * Creates a form to delete a OrendaResh entity.
     *
     * @param OrendaResh $orendaResh The OrendaResh entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(OrendaResh $orendaResh) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('orendaresh_delete', array('id' => $orendaResh->getId())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }

    public function pdfAction(OrendaResh $orendaResh) {
        $html = $this->renderView('pdf.html.twig', array(
            'orendaresh' => $orendaResh
        ));

        $filename = sprintf('test-%s.pdf', date('Y-m-d'));

        return new Response(
                $this->get('knp_snappy.pdf')->getOutputFromHtml($html,
                                   array('orientation'=>'Landscape',
                                         )), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => sprintf('attachment; filename="%s"', $filename),
                ]
        );
    }

}
