<?php

namespace kmdaBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use kmdaBundle\Entity\RentDocuments;
use kmdaBundle\Form\RentDocumentsType;

/**
 * RentDocuments controller.
 *
 */
class RentDocumentsController extends Controller
{
    /**
     * Lists all RentDocuments entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $rentDocuments = $em->getRepository('kmdaBundle:RentDocuments')->findAll();

        return $this->render('rentdocuments/index.html.twig', array(
            'rentDocuments' => $rentDocuments,
        ));
    }

    /**
     * Creates a new RentDocuments entity.
     *
     */
    public function newAction(Request $request)
    {
        $rentDocument = new RentDocuments();
        $form = $this->createForm('kmdaBundle\Form\RentDocumentsType', $rentDocument);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($rentDocument);
            $em->flush();

            return $this->redirectToRoute('rentdocuments_show', array('id' => $rentDocument->getId()));
        }

        return $this->render('rentdocuments/new.html.twig', array(
            'rentDocument' => $rentDocument,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a RentDocuments entity.
     *
     */
    public function showAction(RentDocuments $rentDocument)
    {
        $deleteForm = $this->createDeleteForm($rentDocument);

        return $this->render('rentdocuments/show.html.twig', array(
            'rentDocument' => $rentDocument,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing RentDocuments entity.
     *
     */
    public function editAction(Request $request, RentDocuments $rentDocument)
    {
        $deleteForm = $this->createDeleteForm($rentDocument);
        $editForm = $this->createForm('kmdaBundle\Form\RentDocumentsType', $rentDocument);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($rentDocument);
            $em->flush();

            return $this->redirectToRoute('rentdocuments_edit', array('id' => $rentDocument->getId()));
        }

        return $this->render('rentdocuments/edit.html.twig', array(
            'rentDocument' => $rentDocument,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a RentDocuments entity.
     *
     */
    public function deleteAction(Request $request, RentDocuments $rentDocument)
    {
        $form = $this->createDeleteForm($rentDocument);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($rentDocument);
            $em->flush();
        }

        return $this->redirectToRoute('rentdocuments_index');
    }

    /**
     * Creates a form to delete a RentDocuments entity.
     *
     * @param RentDocuments $rentDocument The RentDocuments entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(RentDocuments $rentDocument)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('rentdocuments_delete', array('id' => $rentDocument->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
