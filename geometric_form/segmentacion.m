classdef segmentacion
    %UNTITLED Summary of this class goes here
    %   Detailed explanation goes here

    properties
        img;
        Filas;
        Columnas;
        Canales;
    end

    methods
        function obj=segmentacion(Img)
            obj.img=imresize(Img(:,:,:), [500 500], 'bicubic');
            [obj.Filas, obj.Columnas, obj.Canales]=size(obj.img);

        end

        function salida=FiltroCIELAB(obj)
            img_salida=zeros(obj.Filas, obj.Columnas);
            lab=obj.img;
               for i=1:obj.Filas
                for j=1:obj.Columnas
                         if(lab(i,j,2)>100 && lab(i,j,2)<115)
                             img_salida(i,i)=1; %color blanco
                           else p(j,i)=0; %color negro
                         end
                     end
               end
                salida=img_salida;
                  uint8(salida);
        end
        function salida=Otsu(obj)

            if obj.Canales>2
                img2=rgb2gray(obj.img);
            else
                img2=obj.img;
            end

            %%% Crear histograma
            H = zeros(1,256);

            for i=1:obj.Filas
                for j=1:obj.Columnas
                    k=img2(i,j)+1;
                    k=int32(k);
                    H(k)=H(k)+1;
                 end
            end
            %%%fin de crear histograma
            %Inicializa valores para buscar optimo
            var_min=1/0;
            umb=0;
            for i=1:256
                %Inicializa valores para la clase igual o menor al umbral
                tot1=0.0;
                mean1=0.0;
                var1=0.0;
                for j=1:i
                    tot1=tot1+H(j); % Sumatoria del numero de ejemplares
                    mean1=mean1+H(j)*j; % Sumatoria del numero de ejemplares por su
                            % valor de umbral
                end
                mean1 = mean1/tot1; % Calculo de promedio
                    prob1 = tot1/(x*y); % Calculo de la probabilidad de pertencer a la clase
                    for(j=1:i)
                        var1 = var1 + H(j)*(j-mean1)^2; % Sumatoria de la diferencias al cuadrado
                                                        % entre cada nivel de gris y el promedio
                    end
                    var1 = var1/tot1; % Calculo de varianza


                    % Inicializa valores para la clase mayor al umbral
                    % Analogo a los valores de clase igual o menor.
                    tot2=0.0;
                    mean2=0.0;
                    var2=0.0;
                    for(j=i+1:256)
                        tot2=tot2+H(j);
                        mean2=mean2+H(j)*j;
                    end
                    mean2 = mean2/tot2;
                    prob2 = tot2/(x*y);
                    for(j=i+1:256)
                        var2 = var2 + H(j)*(j-mean2)^2;
                    end
                    var2 = var2/tot2;


                    % Verificaci�n de no divisi�n por cero
                    if(tot1==0.0 | tot2==0.0)
                        continue;
                    end

                    % Calculo de funci�n objetivo
                    var=prob1*var1+prob2*var2;

                    % Busqueda de optimo global
                    if(var<var_min)
                        var_min=var;
                        umb=i;
                    end
                end
            % Umbralizaci�n de prueba.
            for i=1:obj.Filas
                for j=1:obj.Columnas
                  if(img2(i,j)>umb)
                      salida(i,j)=255;
                   else
                      salida(i,j)=0;
                   end
                end
            end

            uint8(salida);
        end
    end

end
