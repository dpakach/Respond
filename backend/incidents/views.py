from django.shortcuts import render
from .config.config import firebase_config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .for_radius import boundingBox

# Firebase configuration
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("incidents/config/respond-1531702769623-firebase-adminsdk-wzhwl-846c5a4648.json")
firebase_admin.initialize_app(cred, firebase_config)

db = firestore.client()


class IncidentsView(APIView):

    @staticmethod
    def get(request):
        try:
            incidents_collection = db.collection('incidents')
        except:
            return Response('No incidents.')
        final_incidents = []
        query_incidents = incidents_collection.where('status', '==', 'verified')
        for incident in query_incidents.get():
            dict_incident = incident.to_dict()
            final_incidents.append(dict_incident)
        return Response(final_incidents, status=status.HTTP_200_OK)


class IncidentsDetailView(APIView):

    @staticmethod
    def get(request, incident_id):
        try:
            incident = db.collection('incidents').document(incident_id)
            incident = incident.get()
        except:
            return Response('Invalid incident ID.')
        return Response(incident.to_dict())

class QueryIncidents(APIView):

    @staticmethod
    def get(request):
        if request.query_params:
            lat_min = float(request.query_params['lat_min'])
            long_min = float(request.query_params['long_min'])
            lat_max = float(request.query_params['lat_max'])
            long_max = float(request.query_params['long_max'])

            try:
                incidents_collection = db.collection('incidents')
            except:
                return Response('No incidents.')

            # query_incidents = incidents_collection.where('location.longitude', '<=', long_max).where('location.longitude', '>=', long_min)

            final_incidents = []
            for incident in incidents_collection.get():
                dict_incident = incident.to_dict()
                if (lat_min < dict_incident['location']['latitude'] < lat_max) and (long_min < dict_incident['location']['longitude'] < long_max):
                    final_incidents.append(dict_incident)

            return Response(final_incidents, status=status.HTTP_200_OK)
        else:
            return Response('Location Parameters not found.', status=status.HTTP_404_NOT_FOUND)


class BoundingBoxView(APIView):
    def get(self, request):
        if request.query_params:
            lat_deg = float(request.query_params['lat'])
            long_deg = float(request.query_params['long'])
            halfside_distance = 10
            return Response(boundingBox(lat_deg, long_deg, halfside_distance))
        else:
            return Response('Parameters not provided.')
    
            




            





