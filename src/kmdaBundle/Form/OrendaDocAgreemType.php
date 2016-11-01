<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrendaDocAgreemType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('kmdaobject','text',array('disabled'=>true,'label'=>false))
//            ->add('organization','text',array('disabled'=>true,'label'=>false))
//            ->add('costrentagreement','text',array('disabled'=>true,'label'=>false))
            ->add('note2','textarea',array('label'=>'Примітка',
                                            'required'    => false,
                                            'empty_data'  => null))
            ->add('agreem1')
            ->add('agreem2')
;

//            ->add('created',null,array('disabled'=>true, 'label'=>'Дата подачі'))
//            ->add('kmdaobject')
        
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'kmdaBundle\Entity\OrendaDoc',
            'label' => false
        ));
    }
        public function getName()
    {
        return 'orenda_doc_agreem_type';
    }
}
