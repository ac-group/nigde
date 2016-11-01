<?php

namespace kmdaBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use kmdaBundle\Entity\Street;
use kmdaBundle\Entity\Street_Type;
use kmdaBundle\Entity\Test;
// use JMS\Serializer\Serializer;
// use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\Decoder;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\Encoder\JsonDecode;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Serializer;
// use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
/**
 * BalanceObject controller.
 *
 */
class ApiController extends FOSRestController
{
    /**
     * Lists all BalanceObject entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
//        $requestingUser = $this->get('security.context')->getToken()->getUser();
//        if (!$requestingUser) {
//                throw new AccessDeniedHttpException();
//        }
//        $requestingUser = array("hello world");
        $requestingUser = $em->getRepository('kmdaBundle:Street')->findAll();
//                ->findBy(
//            array(),
//            array('id' => 'ASC'),
//            20,
//            0
//        );
//        $normalizer = new ObjectNormalizer(new GetSetMethodNormalizer());
        $normalizer = new ObjectNormalizer(null);
        $normalizer->setIgnoredAttributes(array('theGeom'));
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });
   $encoder = new JsonEncoder(new JsonEncode(array(JSON_UNESCAPED_SLASHES)), new JsonDecode(false));
   $serializer = new Serializer(array($normalizer), array($encoder));
   $res=$serializer->serialize( $requestingUser, 'json');
 //  var_dump($res);die;
        $view = $this->view($res, 200);
        
//        $serializer = new Serializer();

//        $context = new Serializer();
////        $context->setGroups(array('group1'));
//        $view->setSerializationContext($context);
        
        return $this->handleView($view);
    }
    public function streettypeAction() {
        $em = $this->getDoctrine()->getManager();
        $streettype = $em->getRepository('kmdaBundle:Street_Type')->findAll();
        $view = $this->view($streettype, 200);
        return $this->handleView($view);        
    }
    public function streetsearchAction(Request $request) {
        $number = $request->query->get('n');
        $street = $request->query->get('s');
        if(!$number || !$street){
            $view = $this->view("incorrect number of arguments", 400);
            return $this->handleView($view);
        }
        $em = $this->getDoctrine()->getManager();
//        $query = $em->createQuery(
//                'SELECT s.name_en FROM kmdaBundle:Street s WHERE s.name_en LIKE :street'
//        );
        $query = $em->createQuery(
                'SELECT s.name_en, n.addrNumber, n.id FROM kmdaBundle:Street s LEFT JOIN s.addr_num n WHERE ((s.name_en LIKE :street) OR (s.name_ru LIKE :street)) AND n.addrNumber LIKE :number'
        );
        $query->setParameter('street', '%' . $street . '%');
        $query->setParameter('number', $number);
        $result = $query->getResult();
//        var_dump($result);
        $view = $this->view($result, 200);
        return $this->handleView($view);        
    }
    public function putmsgAction(Request $request){
        $msg = $request->request->get('msg');
        if(!$msg){
            $view = $this->view("incorrect number of arguments", 400);
            return $this->handleView($view);
        }
        $em = $this->getDoctrine()->getManager();
        $test = new Test();
        $test->setMsg($msg);

        $em->persist($test);
            $em->flush();
            if($test->getId()) {
            $view = $this->view("OK", 200);
            return $this->handleView($view);                    
            }
        $view = $this->view("Error", 400);
        return $this->handleView($view);
    }
}
