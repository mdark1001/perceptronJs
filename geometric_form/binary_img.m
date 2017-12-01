%% Script de pruebas, inicia el mecanismo de cargar imagenes con Matlab
% @mdark1001 
% miguel.cabrera.app@gmail.com    
% 2017/11/30
%  

close all;
clear all;

addpath 'img/';
%
%img=imread('rect_1.png');
%imshow(umbralizacion_img2gray(img));
%return;

path='img/';
for i=1:4
   k=num2str(i) ;
   nimg=strcat(path,'cirt_',k,'.png');
   img=imread(nimg);
   img=umbralizacion_img2gray(img);
   img=imresize(img(:,:),[24,24],'bicubic');
   img_cirt(:,:,i)=uint8(img(:,:));
   
   nimg=strcat(path,'rect_',k,'.png');
   img=imread(nimg);
   img=umbralizacion_img2gray(img);
   img=imresize(img(:,:),[24,24],'bicubic');
   img_rect(:,:,i)=uint8(img(:,:));
end
%
%save img_cirt;
%save img_rect;
%
%imshow(img_rect(:,:,1));


fid = fopen('set_1.txt','wt');
for i=1:size(img_rect,3)
    A=img_rect(:,:,i);
    for ii = 1:size(A,1)
        for jj=1:size(A,2)
            fprintf(fid,'%g ',A(ii,jj));
        end
       fprintf(fid,'\n');
    end
    fprintf(fid,'0\n');
end

fclose(fid);

fid = fopen('set_2.txt','wt');
for i=1:size(img_cirt,3)
    A=img_cirt(:,:,i);
    for ii = 1:size(A,1)
        for jj=1:size(A,2)
            fprintf(fid,'%g ',A(ii,jj));
        end
       fprintf(fid,'\n');
    end
    fprintf(fid,'1\n');
end

fclose(fid);






