<?php

namespace kmdaBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RentDocumentsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('agreementDate', 'date')
            ->add('agreementNumber')
            ->add('isActive')
            ->add('costRentAgreement')
            ->add('costExpert1m')
            ->add('reason')
            ->add('rentStartDate', 'date')
            ->add('rentFinishDate', 'date')
            ->add('rentRatePercent')
            ->add('sqrRent')
            ->add('isSubrent')
            ->add('paymentType')
            ->add('idRentContract')
            ->add('fileName')
            ->add('filePath')
            ->add('fileExt')
            ->add('fileCreateDate', 'date')
            ->add('reviewDate', 'date')
            ->add('propertyRentObject')
            ->add('cost1hour')
            ->add('usingSchedule')
            ->add('hoursOfWeek')
            ->add('hoursOfMonth')
            ->add('cost1month')
            ->add('incomeNumber')
            ->add('inputNamber')
            ->add('entryToCommisDate', 'date')
            ->add('entryToLessorDate', 'date')
            ->add('announcementDate', 'date')
            ->add('costObject')
            ->add('admonition')
            ->add('notes')
            ->add('valuationDate', 'date')
            ->add('idQuestionType')
            ->add('idBalanceHolder')
            ->add('idRenter')
            ->add('idLessor')
            ->add('idStatusReview')
            ->add('idRentType')
            ->add('Street')
            ->add('AddrNumber')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'kmdaBundle\Entity\RentDocuments'
        ));
    }
}
