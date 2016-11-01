<?php

namespace kmdaBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use kmdaBundle\Entity\OrendaDoc;
use kmdaBundle\Form\OrendaDocType;
use kmdaBundle\Entity\kmdaObject;
use kmdaBundle\WorkFlow\Model\OrendaDocModel;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * OrendaDoc controller.
 *
 */
class OrendaDocController extends Controller {

    /**
     * Lists all OrendaDoc entities.
     *
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();

        $orendaDocs = $em->getRepository('kmdaBundle:OrendaDoc')->findAll();

        return $this->render('orendadoc/index.html.twig', array(
                    'orendaDocs' => $orendaDocs,
        ));
    }

    /**
     * Creates a new OrendaDoc entity.
     *
     */
    public function newAction($kmdaobjectid, Request $request) {
        $orendaDoc = new OrendaDoc();
        $form = $this->createForm('kmdaBundle\Form\OrendaDocType', $orendaDoc);
        $form->handleRequest($request);

        $em = $this->getDoctrine()->getManager();
        $kmdaobject = $this->getDoctrine()->getRepository('kmdaBundle:kmdaObject')->find($kmdaobjectid);

        if (!$kmdaobject) {
            throw $this->createNotFoundException('об\'єкт не знайдено');
        }
        $orendaDoc->setKmdaobject($kmdaobject);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $model = new OrendaDocModel($orendaDoc);
            $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');
            $em->persist($orendaDoc);
            $processHandler->start($model);
            
            $em->flush();            
            return $this->redirectToRoute('version2');
//            return JsonResponse::create(true); 
            
        }

        return $this->render('orendadoc/new.html.twig', array(
                    'orendaDoc' => $orendaDoc,
                    'form' => $form->createView(),
        ));
    }

    public function newajaxAction(Request $request) {
                $orendaDoc = new OrendaDoc();
        $form = $this->createForm('kmdaBundle\Form\OrendaDocType', $orendaDoc);
        $form->handleRequest($request);
                if ($form->isSubmitted() && $form->isValid()) {

            $em->persist($orendaDoc);
            $em->flush();
                }
        return $this->redirectToRoute('orendaresh_index');
    }
    /**
     * Finds and displays a OrendaDoc entity.
     *
     */
    public function showAction(OrendaDoc $orendaDoc) {
        $deleteForm = $this->createDeleteForm($orendaDoc);

        return $this->render('orendadoc/show.html.twig', array(
                    'orendaDoc' => $orendaDoc,
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing OrendaDoc entity.
     *
     */
    public function editAction(Request $request, OrendaDoc $orendaDoc) {
        $deleteForm = $this->createDeleteForm($orendaDoc);
        $editForm = $this->createForm('kmdaBundle\Form\OrendaDocType', $orendaDoc);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($orendaDoc);
            $em->flush();

            return $this->redirectToRoute('orendadoc_edit', array('id' => $orendaDoc->getId()));
        }

        return $this->render('orendadoc/edit.html.twig', array(
                    'orendaDoc' => $orendaDoc,
                    'edit_form' => $editForm->createView(),
                    'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a OrendaDoc entity.
     *
     */
    public function deleteAction(Request $request, OrendaDoc $orendaDoc) {
        $form = $this->createDeleteForm($orendaDoc);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($orendaDoc);
            $em->flush();
        }

        return $this->redirectToRoute('orendadoc_index');
    }
    public function removeAction(OrendaDoc $orendaDoc) {
        
    }
    /**
     * Creates a form to delete a OrendaDoc entity.
     *
     * @param OrendaDoc $orendaDoc The OrendaDoc entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(OrendaDoc $orendaDoc) {
        return $this->createFormBuilder()
                        ->setAction($this->generateUrl('orendadoc_delete', array('id' => $orendaDoc->getId())))
                        ->setMethod('DELETE')
                        ->getForm()
        ;
    }
    public function ajaxdeleteAction(Request $request) {
        $id=$request->get('id');
        $meetnum=$request->get('meetnum');
        $em = $this->getDoctrine()->getManager();
        $orendaDoc = $this->getDoctrine()->getRepository('kmdaBundle:OrendaDoc')->find($id);
        $meeting = $this->getDoctrine()->getRepository('kmdaBundle:OrendaResh')->find($meetnum);
        
        if (!$orendaDoc || !$meeting) {
            throw $this->createNotFoundException('об\'єкт не знайдено');
        }
        if(!$this->get('security.context')->isGranted('ROLE_GOLOVA')) 
        {
            throw $this->createNotFoundException('немає повноважень');
        }
        $processHandler = $this->container->get('lexik_workflow.handler.orenda_agreement');  
        $model = new OrendaDocModel($orendaDoc);
        if($processHandler->reachNextState($model, 'deleted', true)) {
            $meeting->removeOrendadoc($orendaDoc);
            $em->persist($meeting);
        $model->setStatus(\kmdaBundle\WorkFlow\Model\OrendaDocModel::STATUS_DELETED);
//        $em->persist($orendaDoc);
//        $em->flush();
        

        
        return JsonResponse::create(true); 
        }

    return JsonResponse::create(false);
    }
}
