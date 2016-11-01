<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RentDocumentsAdmin
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
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\PropertyAccess\PropertyAccess;

class RentDocumentsAdmin extends Admin {

    protected function configureFormFields(FormMapper $formMapper) {
        $em = $this->getConfigurationPool()->getContainer()->get('Doctrine')->getManager();

        $formMapper
                ->add('agreementDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата договору'
                            ))
                ->add('agreementNumber',null, array('label' => 'Номер договору'))
                ->add('isActive',null,array('label' => 'Актуальність'))
//                ->add('idBalanceHolder','sonata_type_model_autocomplete', array(
//                'property' => 'fullName',
//                    'minimum_input_length' => '2',
//                    'attr'=>array('style' => 'width: 100%')
//            ))
                ->add('idBalanceHolder', 'shtumi_ajax_autocomplete', array('entity_alias'=>'organizations', 'label'=>'Балансоутримувач'))
                ->add('Street', 'entity', array('class' => 'kmdaBundle:Street','label'=>'Вулиця'))
                ->add('AddrNumber'
                        , 'shtumi_dependent_filtered_entity', array('entity_alias' => 'num_by_street',
                        'empty_value'=> 'Виберіть номер'
                      , 'parent_field'=>'Street', 'label'=>'Номер'))
                        
                ->add('costRentAgreement',null,array('label'=>'Вартість приміщень за договором'))
                ->add('costExpert1m',null,array('label'=>'Орендна плата за 1м'))
                ->add('reason',null,array('label'=>'Підстава'))
                ->add('rentStartDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Початок оренди',
                            ))
                ->add('rentFinishDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Кінець оренди',
                            ))
                ->add('rentRatePercent',null,array('label'=>'Орендна ставка'))
                ->add('sqrRent',null,array('label'=>'Площа оренди'))
                ->add('isSubrent',null, array('label'=>'Суборенда'))
                ->add('paymentType',null, array('label'=>'Вид оплати'))
                ->add('idRentContract',null, array('label'=>'Скан договору оренди'))
                ->add('fileName')
                ->add('filePath')
                ->add('fileExt')
                ->add('fileCreateDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                         //   'required' => 'false'
                            ))
                ->add('reviewDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата розгляду'
                            ))
                ->add('propertyRentObject',null,array('label'=>'Характеристика об\'єкта оренди'))
                ->add('cost1hour',null,array('label'=>'Плата за годину'))
                ->add('usingSchedule',null,array('label'=>'Графік використання'))
                ->add('hoursOfWeek',null,array('label'=>'Годин на тиждень'))
                ->add('hoursOfMonth',null,array('label'=>'Годин на місяць'))
//      ->add('cost1month ')   
                ->add('incomeNumber',null,array('label'=>'Вихідний номер'))
                ->add('inputNamber',null,array('label'=>'Вхідний номер'))
                ->add('entryToCommisDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата надходження до комісії'
                            ))
                ->add('entryToLessorDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата надходження до орендодавця'
                            ))
                ->add('announcementDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата оголошення'
                            ))
                ->add('costObject',null,array('label' => 'Вартість об\'єкту'))
                ->add('admonition',null,array('label' => 'Причини відкладання, зауваження'))
                ->add('notes',null,array('label' => 'Примітки'))
                ->add('valuationDate', 'sonata_type_date_picker', 
                        array(
                            'dp_language' => 'uk',
                            'format' => 'dd.MM.yyyy',
                            'label' => 'Дата оцінки'
                            ))
//      ->add('idQuestionType', 'sonata_type_collection', array(
//                'label' => 'Тип питання', 'by_reference' => false,
////                'type_options' => array(
////                    // Prevents the "Delete" option from being displayed
////                    'delete' => true,
//////                    'delete_options' => array(
//////                        // You may otherwise choose to put the field but hide it
//////             //           'type'         => 'hidden',
//////                        // In that case, you need to fill in the options as well
//////                        'type_options' => array(
//////                            'mapped'   => false,
//////                            'required' => false,
//////                        )
//////                    )
////                )
//            ), array(
//                'edit' => 'inline',
//                'inline' => 'table',
//                'sortable' => 'position',
//            ))
                ->add('idQuestionType', 'sonata_type_model', array('expanded' => true, 'by_reference' => false, 'multiple' => false, 'property' => 'name','label'=>'Тип питання'))
        ;

        $addaddrNumbers = function($form, $street) {
            if (!empty($street)) {
                if ($form->has('Street')) {
                    $form->remove('Street');
                }
                $form->add('Street', 'entity', array(
                    'class' => 'kmdaBundle:Street',
                    'label' => 'Вулиця',
                    'query_builder' => function (\Doctrine\ORM\EntityRepository $er) use ($street) {
                        $qb = $er->createQueryBuilder('an');
 
                        if ($street instanceof \kmdaBundle\Entity\Street) {
                            $qb = $qb->where('an.id = :street')
                                ->setParameter('street', $street);
                        }
//                        else if (is_numeric($brand)) {
//                            $qb = $qb->innerJoin('car.brand', 'brand')
//                                ->where('brand.id = :id')
//                                ->setParameter('id', $brand);
//                        }
 
                        return $qb;
                    },
//                    'empty_value' => 'Select street',
//                    'position' => array(	// requires egeloen/ordered-form-bundle
//                        'after' => 'street'
//                    ),
//                    'property' => 'addrNumber',
//                    'validation_groups' => false,
//                    'attr' => array(
//                        'class' => 'clearOnChange'
//                    )
                ));
            }
        };
        $formMapper->getFormBuilder()->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) use ($addaddrNumbers) {
            $data = $event->getData();
            $form = $event->getForm();
 
            if (null === $data)
                return;
 
            $accessor = PropertyAccess::createPropertyAccessor();
 
            $addrnumber = $accessor->getValue($data, 'AddrNumber');
            $tt = $data->getAddrNumber();
//            print_r($tt->getStreet()); die;
            $street = ($addrnumber) ? $addrnumber->getStreet() : null;
 
            $addaddrNumbers($form, $street);
        });  
        
        // Below is used in edit modus, to set the brand selectbox to the right selected value
//        $formMapper->getFormBuilder()->addEventListener(FormEvents::POST_SET_DATA, function(FormEvent $event) {
//            $data = $event->getData();
//            $form = $event->getForm();
// 
//            if (null === $data)
//                return;
// 
//            $accessor = PropertyAccess::createPropertyAccessor();
// 
//            $addrnumber = $accessor->getValue($data, 'addrnumber');
//            $street = ($addrnumber) ? $addrnumber->getIdAddrStreet() : null;
// 
//            if ($street)
//                $form->get('street')->setData($street);
// 
//        });
 
        
//        $formMapper->getFormBuilder()->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) use ($addaddrNumbers) {
//            $form = $event->getForm();
//            $data = $event->getData();
// 
//            if (array_key_exists('street', $data)) {
//                $addaddrNumbers($form, $data['street']);
//            }
//        });
//        $formMapper->getFormBuilder()->addEventListener(
//                FormEvents::POST_BIND, function (FormEvent $event) use ($formMapper, $em) {
//
//            $form = $event->getForm();
//            $data = $event->getData();
////            var_dump($data);
//            if ($data != null) {
//                $servicesQuery = $em->createQueryBuilder();
//                $servicesQuery->add('select', 'a')
//                        ->add('from', 'kmdaBundle\Entity\AddrNumber a')
//                        ->add('where', $servicesQuery->expr()->eq('a.Street', ':id'))
//                        ->setParameter('id', $data->getAddrNumber());
//
//                if ($form->has('AddrNumber')) {
//                    $form->remove('AddrNumber');
//                }
//                //               var_dump($data);
////                if($data!==null) {
////                $form->add('AddrNumber','entity', array(
////                    'class'       => 'kmdaBundle\Entity\AddrNumber',
//////                    'placeholder' => '',
////                    'choices'     => $data->getAddrNumber(),                    
////                ));
////                }
//                $form->add($formMapper->getFormBuilder()->getFormFactory()->createNamed('AddrNumber', 'entity', null, array('required' => true, 'auto_initialize' => false, 'label' => '№', 'error_bubbling' => true, 'attr' => array('show_value_label' => true), 'class' => 'kmdaBundle\Entity\AddrNumber', 'multiple' => false, 'expanded' => false, 'query_builder' => $servicesQuery)));
//            }
//        });
    }

    protected function configureListFields(ListMapper $listMapper) {
        $listMapper
             //   ->addIdentifier('id')
               
                ->add('agreementDate','date',array('date_format' => 'dd MM yyyy','label'=>'Дата договору'))
                 ->addIdentifier('agreementNumber',null,array('label'=>'Номер договору'))
                ->add('idBalanceHolder',null,array('label'=>'Балансоутримувач'));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        // this text filter will be used to retrieve autocomplete fields
        $datagridMapper

                 ->add('agreementNumber',null,array('label'=>'Номер договору'))
            ->add('idBalanceHolder', 'shtumi_ajax_autocomplete', array('entity_alias'=>'organizations', 'label'=>'Балансоутримувач'))
        ;
    }
}
