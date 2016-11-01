<?php

namespace kmdaBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use kmdaBundle\Entity\BalanceObject;
use kmdaBundle\Form\BalanceObjectType;

/**
 * BalanceObject controller.
 *
 */
class BalanceObjectController extends Controller
{
    /**
     * Lists all BalanceObject entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $balanceObjects = $em->getRepository('kmdaBundle:BalanceObject')->findAll();

        return $this->render('balanceobject/index.html.twig', array(
            'balanceObjects' => $balanceObjects,
        ));
    }

    /**
     * Creates a new BalanceObject entity.
     *
     */
    public function newAction(Request $request)
    {
        $balanceObject = new BalanceObject();
        $form = $this->createForm('kmdaBundle\Form\BalanceObjectType', $balanceObject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($balanceObject);
            $em->flush();

            return $this->redirectToRoute('balanceobject_show', array('id' => $balanceObject->getId()));
        }

        return $this->render('balanceobject/new.html.twig', array(
            'balanceObject' => $balanceObject,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a BalanceObject entity.
     *
     */
    public function showAction(BalanceObject $balanceObject)
    {
        $deleteForm = $this->createDeleteForm($balanceObject);

        return $this->render('balanceobject/show.html.twig', array(
            'balanceObject' => $balanceObject,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing BalanceObject entity.
     *
     */
    public function editAction(Request $request, BalanceObject $balanceObject)
    {
        $deleteForm = $this->createDeleteForm($balanceObject);
        $editForm = $this->createForm('kmdaBundle\Form\BalanceObjectType', $balanceObject);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($balanceObject);
            $em->flush();

            return $this->redirectToRoute('balanceobject_edit', array('id' => $balanceObject->getId()));
        }

        return $this->render('balanceobject/edit.html.twig', array(
            'balanceObject' => $balanceObject,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a BalanceObject entity.
     *
     */
    public function deleteAction(Request $request, BalanceObject $balanceObject)
    {
        $form = $this->createDeleteForm($balanceObject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($balanceObject);
            $em->flush();
        }

        return $this->redirectToRoute('balanceobject_index');
    }

    /**
     * Creates a form to delete a BalanceObject entity.
     *
     * @param BalanceObject $balanceObject The BalanceObject entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(BalanceObject $balanceObject)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('balanceobject_delete', array('id' => $balanceObject->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
