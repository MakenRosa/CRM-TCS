from rest_framework import generics, status
from rest_framework.response import Response

from django.contrib.auth.models import Group
from django.contrib.auth.models import Group
from .serializers import GroupSerializer, UsersGroupSerializer
from usuario.models import Usuario

class Grupo(generics.GenericAPIView):
    serializer_class = UsersGroupSerializer

    def get(self, request):
        user_id = request.GET.get("user_id")
        usuario = Usuario.objects.get(id=user_id)
        usuarios_grupos = Usuario.objects.filter(cd_grupo=usuario.cd_grupo)

        total_usuarios = usuarios_grupos.count()
        if total_usuarios == 0 :
            return Response({"data": {"message: This group don't have users"}}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(usuarios_grupos, many=True)
        return Response({
            "data": {"message": "Users found",
                     "nome_grupo": usuario.nm_grupo,
                     "groups": serializer.data}
        },)

        
class GrupoDetails(generics.GenericAPIView):
    serializer_class = GroupSerializer

    def get_user(self, nm_grupo):
        try:
            return Group.objects.get(name=nm_grupo)
        except:
            return None

    def get(self, request, nm_grupo):
        grupo = self.get_user(nm_grupo=nm_grupo)
        if grupo == None:
            return Response({"status": "fail", "data": {"message": f"group with name: {nm_grupo} not found"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(grupo)
        return Response({"status": "success", "data": {"message": "Group found", "group": serializer.data}})


    def delete(self, request, nm_grupo):
        grupo = self.get_user(nm_grupo)
        if grupo == None:
            return Response({"status": "fail",  "data": {"message": f"group with name: {nm_grupo} not found"}}, status=status.HTTP_404_NOT_FOUND)

        grupo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
