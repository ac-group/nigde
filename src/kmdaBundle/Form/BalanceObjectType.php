<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BalanceObjectType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('BuildingId')
            ->add('AddrStreet')
            ->add('AddrNumber')
            ->add('SqrTotal')
            ->add('CostBalans')
            ->add('ObjectName')
            ->add('GeoCoding')
            ->add('District')
            ->add('BuildingTechState')
            ->add('BuildingType')
            ->add('BuildingKind')
            ->add('Organization')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'kmdaBundle\Entity\BalanceObject'
        ));
    }
}
