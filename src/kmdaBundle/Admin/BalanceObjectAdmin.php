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
use kmdaBundle\Entity\Oraganization;

class BalanceObjectAdmin extends Admin
{
  /**
   * Конфигурация формы редактирования записи
   * 
   * @param \Sonata\AdminBundle\Form\FormMapper $formMapper
   */
  protected function configureFormFields(FormMapper $formMapper)
  {
    $formMapper
//      ->add('AddrStreet')
//      ->add('AddrNumber')
// //     ->add('ObjectName')
//      ->add('CostBalans')
////      ->add('geocoding','entity',array('class' => 'kmdaBundle\Entity\GeoCoding','by_reference' => false))
//      ->add('District')
//      ->add('BuildingTechState')
//      ->add('BuildingType')
//      ->add('BuildingKind')
//      ->add('Organization', 'sonata_type_model_autocomplete', array(
//                'property' => 'name', 'class' => 'kmdaBundle\Entity\Organization'
//            ))
//            
  
                  ->add('locationPremises')
      ->add('inventoryNumber')
//     ->addIdentifier('ObjectName')
      ->add('costBalans')
      ->add('sqrTotal')
      ->add('sqrFree');
  }
 
  /**
   * Конфигурация списка записей
   *
   * @param \Sonata\AdminBundle\Datagrid\ListMapper $listMapper
   */
  protected function configureListFields(ListMapper $listMapper)
  {
    $listMapper
      ->add('locationPremises')
      ->add('inventoryNumber')
//     ->addIdentifier('ObjectName')
      ->add('costBalans')
      ->add('sqrTotal')
      ->add('sqrFree')
//      ->add('BuildingTechState')
//      ->add('BuildingType')
//      ->add('BuildingKind')
//      ->add('Organization')
            ;
  }
 
  /**
   * Поля, по которым производится поиск в списке записей
   *
   * @param \Sonata\AdminBundle\Datagrid\DatagridMapper $datagridMapper
   */
  protected function configureDatagridFilters(DatagridMapper $datagridMapper)
  {
//    $datagridMapper
//      ->add('ObjectName');
  }

}