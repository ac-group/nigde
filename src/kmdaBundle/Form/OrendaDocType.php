<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrendaDocType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('tip','choice',array(
                'choices'  => array(
                    null=>'Тип питання',
                    'Единий претендент'=>'Единий претендент',
                    'Без конкурсу'=>'Без конкурсу',
                    'Оголошення конкурсу'=>'Оголошення конкурсу',
                    'Продовження'=>'Продовження',
                    'Змiна IV (зменшення платы: знижка)' => 'Змiна IV (зменшення платы: знижка)',
                    'Змiна IV (тимчасове зменшення орендної плати)' => 'Змiна IV (тимчасове зменшення орендної плати)',
                    'Змiна IV (зменшення платы: приведення у вiдповiдность)' => 'Змiна IV (зменшення платы: приведення у вiдповiдность)',
                    'Змiна IV (збiльшення платы: приведення у вiдповiдность)' => 'Змiна IV (збiльшення платы: приведення у вiдповiдность)',
                    'Змiна IV (змiна площi)'=> 'Змiна IV (змiна площi)',
                    'Змiна IV (звшльнення вiд платы)' => 'Змiна IV (звшльнення вiд платы)',
                    'Змiна IV (змiна цiльового призначення)' => 'Змiна IV (змiна цiльового призначення)',
                    'Змiна IV (Iнше)' => 'Змiна IV (Iнше)',
                    'Iнше' => 'Iнше'
                    ),'label' => 'Тип питання'))            
            ->add('sqrrent',null,array('label'=>'Орендована площа'))
  //          ->add('costrentagreement',null,array('label' => 'Вартість оренди'))
            ->add('note',null, array('label'=>'Примітка'))
  //          ->add('organization','shtumi_ajax_autocomplete', array('entity_alias'=>'organizations','label'=>'Орендар'))
  //          ->add('kmdaobject','hidden')
            ->add('organization')
            ->add('edrpouOrganization')
//            ->add('balanceHolder')
//            ->add('landLord')
//            ->add('valuationNumber')
            ->add('valuator')
            ->add('category')
            ->add('rentRatePercent')
            ->add('cost1month')
            ->add('leaseTerm')
//            ->add('status','choice',array('choices'=>array(
//                null=>'Статус розгляду',
//                '1'=>'Погоджено',
//                '2'=>'Погоджено с зауваженнями',
//                '3'=>'Вiдхилено',
//                '4'=>'Перенемено',
//                '5'=>'Не набрало кiлькостi голосiв'
//            )))
//            ->add('object','hidden')
//            ->add('agreem1')
//            ->add('agreem2')
              ->add('reviewDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
              ->add('agreementNumber', null, array('label' => ' '))
              ->add('incomeNumber', null, array('label' => ' '))
              ->add('outgoingNumber', null, array('label' => ' '))
              ->add('entryToLessorDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
              ->add('entryToCommisDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
              ->add('reviewDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
              ->add('announcementDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
              ->add('valuationDate', 'date',array(
                'required'=>true,
                'widget'=>'single_text',                
                'format'=>'d/M/y',
                'label' => ' '))
//              ->add('houseKind','choice',array(
//                'choices'  => array(
//                    null =>'Тип будинку',
//                    'житловий'=>'житловий',
//                    'нежитловий'=>'нежитловий',
//                    'адміністративний'=>'адміністративний',
//                    'лікувальний'=>'лікувальний',
//                    'школа' => 'школа',
//                    'ДНЗ' => 'ДНЗ',
//                    ),'label' => 'Тип будинку')) 
              ->add('rentType','choice',array(
                'choices'  => array(
                    null=>'Тип оренди',
                    'короткострокова'=>'короткострокова',
                    'місячна'=>'місячна',
                    'погодинна'=>'погодинна',                   
                    ),'label' => 'Тип оренди'))
//              ->add('propertyRentObject','choice',array(
//                'choices'  => array(
//                    null=>'Характеристика обєкту оренди',
//                    'Будівля'=>'Будівля',
//                    'Приміщення'=>'Приміщення',
//                    'Поверх'=>'Поверх',
//                    'Споруда'=>'Споруда',
//                    ),'label' => 'Характеристика обєкту оренди')) 
              ->add('purpose')
                
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'kmdaBundle\Entity\OrendaDoc'
        ));
    }
        public function getName()
    {
        return 'orenda_doc_type';
    }
}
