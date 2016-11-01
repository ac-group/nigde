<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LotsAdmin
 *
 * @author asokolsky
 */
namespace kmdaBundle\Admin;
 
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Show\ShowMapper;
// use AES\Bundle\landsBundle\Entity\Lots;
// use kmdaBundle\Entity\Oraganization;


class AddrNumberAdmin extends Admin
{

protected function configureFormFields(FormMapper $formMapper)
  {
    $formMapper
      ->add('addrNumber')
      ->add('isActive')
      ->add('Street')      
            ;
  }
   protected function configureListFields(ListMapper $listMapper)
  {
    $listMapper
      ->addIdentifier('id')
      ->addIdentifier('addrNumber')
      ->addIdentifier('Street', null, array('label' => 'вулиця'));
       
  }
 
  /**
   * Поля, по которым производится поиск в списке записей
   *
   * @param \Sonata\AdminBundle\Datagrid\DatagridMapper $datagridMapper
   */
  protected function configureDatagridFilters(DatagridMapper $datagridMapper)
  {
    $datagridMapper
      ->add('addrNumber');
  }   
}