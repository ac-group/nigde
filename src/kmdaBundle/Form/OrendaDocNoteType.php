<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrendaDocNoteType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('note','textarea', array('required'=>false,'label'=>'Примітка','attr'=>array('class'=>'mdl-textfield__input active')))
//            ->add('kmdaobject')

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
        return 'orenda_doc_note_type';
    }
}
