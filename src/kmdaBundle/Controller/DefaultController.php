<?php

namespace kmdaBundle\Controller;

use kmdaBundle\Entity\VotingDtp;
use kmdaBundle\kmdaBundle;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\StreamedResponse;
use kmdaBundle\Entity\BuildingType;
use kmdaBundle\Entity\BuildingKind;
use kmdaBundle\Entity\BuildingTechState;
use kmdaBundle\Entity\DictBuildingPurpose;
use kmdaBundle\Entity\BalanceObjectPhoto;
use kmdaBundle\Entity\District;
use kmdaBundle\Entity\Street;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class DefaultController extends Controller {

    public function indexAction() {
        if($this->getUser()->getUsername() == 'Golova') {
            return $this->redirect($this->generateUrl('orendaresh_index'));
        }
        $em = $this->getDoctrine()->getManager();

        $buildingType = $em->getRepository('kmdaBundle:BuildingType')->findAll();
        $buildingKind = $em->getRepository('kmdaBundle:BuildingKind')->findAll();
        $buildingTechState = $em->getRepository('kmdaBundle:BuildingTechState')->findAll();
        $dictbuildingPurpose = $em->getRepository('kmdaBundle:DictBuildingPurpose')->findAll();

//        $districts = $em->getRepository('kmdaBundle:District')->findAll();
        return $this->render('kmdaBundle:Default:index.html.twig', array(
                    'buildingType' => $buildingType,
                    'buildingKind' => $buildingKind,
                    'buildingTechState' => $buildingTechState,
                    'dictbuildingPurpose' => $dictbuildingPurpose,
//            'balanceobjectphoto' => $balanceobjectphoto->getLongId(),
//            'districts' => $districts,
        ));
    }

    public function getbalanceobjectphotoAction($id) {
//        $id = 15440;
        $em = $this->getDoctrine()->getManager();
        $balanceobjectphoto = $em->getRepository('kmdaBundle:BalanceObjectPhoto')->findOneBy(array('balanceobject' => $id));
        //     var_dump($balanceobjectphoto); die;
        $response = new StreamedResponse(function () use ($balanceobjectphoto) {
            echo stream_get_contents($balanceobjectphoto->getImage());
        });
        $response->headers->set('Content-Type', 'image/jpeg');
        //       $response->setContent($balanceobjectphoto->getImage());
        return $response;
    }

    public function getsearchAction(Request $request) {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        
        $searchstring = mb_convert_case(trim(strip_tags($request->get('searchstring'))), MB_CASE_LOWER, "UTF-8"); 
        if(!$searchstring) {
            $response = new JsonResponse();
            $response->setStatusCode(400);
            return $response;
        }
//        var_dump($searchstring);
        $em = $this->getDoctrine()->getManager();
//$entities = new Street();
        $entities = $em->getRepository('kmdaBundle:Street')->createQueryBuilder('s')
           ->where('lower(s.full_name) LIKE :searchstring')
           ->setParameter('searchstring', '%'.$searchstring.'%')
           ->getQuery()
           ->getResult();
        
 //  print_r($entities[0]);
        
        $points=$entities[0]->getTheGeom()->getlineString(0)->getPoints();
        $minX = $maxX = $points[0]->getX();
        $minY = $maxY = $points[0]->getY();
        foreach ($points as $point) {
            if($point->getX()>$maxX) {
                $maxX = $point->getX();
            }
            if($point->getX()<$minX) {
                $minX = $point->getX();
            }
            if($point->getY()>$maxY) {
                $maxY = $point->getY();
            }
            if($point->getY()<$minY) {
                $minY = $point->getY();
            }
        }
//        $queryBuilder = $em->createQueryBuilder();
//    $queryBuilder
//        ->select("ST_GeomFromText('linestring $tt')")
//        ->from('kmdaBundle\Entity\BalanceObject', 'b');
////        ->setParameter('tt', $tt);
////    
//     $results = $queryBuilder->getQuery()->getResult();
        
//     $results=$em->createQueryBuilder()->select("ST_GeomFromText('linestring $tt')")->from('kmdaBundle\Entity\BalanceObject', 'b1')->getQuery()->getResult();
//     $tt = $results[0][1];
//     $results = $em->createQueryBuilder()->select("ST_MakeBox2D('linestring $tt')")->from('kmdaBundle\Entity\BalanceObject', 'b1')->getQuery()->getResult();
//     var_dump($results);
        $response = new JsonResponse();
//        return $response->setContent($serializer->serialize($entities, 'json'));
        return $response->setContent($serializer->serialize([$minX,$minY,$maxX,$maxY,$entities[0]->getId()], 'json'));
    }
    
    public function autocompleteAction(Request $request)
    {
        $names = array();
        $searchstring = mb_convert_case(trim(strip_tags($request->get('term'))), MB_CASE_LOWER, "UTF-8"); 

        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('kmdaBundle:Street')->createQueryBuilder('s')
           ->where('lower(s.full_name) LIKE :searchstring')
           ->setParameter('searchstring', '%'.$searchstring.'%')
           ->getQuery()
           ->getResult();

        foreach ($entities as $entity)
        {
 //           $names[] = array('label'=>$entity->getName() . " " . $entity->getStreetType()->getName(), 'value'=>$entity->getName());
            $names[] = array('label'=>$entity->getFullName(), 'value'=>$entity->getFullName());
        }

        $response = new JsonResponse();
        $response->setData($names);
//        $response->setContent(json_encode(array('data'=>$names)));
        return $response;
    }

    public function votingAction(Request $request){
        $newVoice = new VotingDtp();
        $newVoice->setVoice(boolval($request->get('votingRes')));
        $newVoice->setIdTicketit(($request->get('idTicketit')));
        $newVoice->setIpUser($request->getClientIp());
        $em = $this->getDoctrine()->getManager();
        $em->persist($newVoice);

        $response = new JsonResponse(
            array(
                'message' =>  $em->flush()
            ));

        return $response;
    }

    public function votingResultAction(Request $request){
        $idTicketit = $request->get('idTicketit');
        $emTrue = $this->getDoctrine()
            ->getRepository('kmdaBundle:VotingDtp')
            ->findBy(
                array('idTicketit'=>$idTicketit,
                      'voice'=>'t')
            );
        $emFalse = $this->getDoctrine()
            ->getRepository('kmdaBundle:VotingDtp')
            ->findBy(
                array('idTicketit'=>$idTicketit,
                      'voice'=>'f')
            );
        $response = new JsonResponse(
            array(
                'true' => count($emTrue),
                'false'=> count($emFalse)
            ));

        return $response;
    }

    public function checkIpAction(Request $request){
        $idTicketit = $request->get('idTicketit');
        $ipUser = $request->getClientIp();
        $res = '';
        $em = $this->getDoctrine()
            ->getRepository('kmdaBundle:VotingDtp')
            ->findOneBy(
                array('ipUser'=>$ipUser,
                     'idTicketit'=>$idTicketit,)
            );

        if($em !== null){
            $res = true;
        }else{
            $res = false;
        }
        $response = new JsonResponse(
            array(
                'ifIp' =>   $res
            ));

        return $response;
    }
}