<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
//use Doctrine\ORM\EntityRepository;
//use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;

class OrendaReshSolutionType extends AbstractType
{
//    /** @var \Doctrine\ORM\EntityManager */
//    private $em;
//
//    /**
//     * Constructor
//     * 
//     * @param Doctrine $doctrine
//     */
//    public function __construct(Doctrine $doctrine)
//    {
//        $this->em = $doctrine->getManager();
//    }
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
                       ->add('title',null,array('label'=>'Назва комісії','required'=>true))
            ->add('expected', 'datetime',array(
                'required'=>true,
                'date_widget'=>'single_text',                
                'date_format'=>'y-M-d',
                'time_widget' => 'single_text'))
            ->add('orendadoc','collection',array(
                'label'=>false,
                'entry_type' => 'kmdaBundle\Form\OrendaDocSolutionType',    
                'by_reference' => false,
                'prototype' => true,
                'allow_delete' => true,
                'attr' => array(
                        'class' => 'my-selector',
                )))


            ->add('submit','submit')
            ;
                
 //           ->add('submit',null);
//        $orendadocs = $this->em->getRepository('kmdaBundle:OrendaDoc')->findAll();
////        var_dump($orendadocs);die;
//        foreach ($orendadocs as $orendadoc) {
//            $builder->get('orendadoc')->add($orendadoc->getId());
//        }
       // $builder->get('orendadoc')->add(3);
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'kmdaBundle\Entity\OrendaResh',
//            'compound'     => true,
        ));
    }
}
