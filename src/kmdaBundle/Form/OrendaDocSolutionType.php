<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrendaDocSolutionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('note',null, array('label'=>'Примітка'))
            ->add('note2',null, array('label'=>'Ріш. комісії'))
  //          ->add('organization','shtumi_ajax_autocomplete', array('entity_alias'=>'organizations','label'=>'Орендар'))
  //          ->add('kmdaobject','hidden')

            ->add('solution','choice',array('choices'=>array(
                '1'=>'Погоджено',
                '2'=>'Погоджено с зауваженнями',
                '3'=>'Вiдхилено',
                '4'=>'Перенемено',
                '5'=>'Не набрало кiлькостi голосiв'
            )))
//            ->add('object','hidden')
//            ->add('agreem1')
//            ->add('agreem2')
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
