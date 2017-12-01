function [ binary_img ] = umbralizacion_img2gray(img)
%umbralizacion_img2gray Summary of this function goes here
%   Detailed explanation goes here
size_c=size(img);
img_output=zeros(size_c(1),size_c(2));  
if(size_c(3)>2)
    img=rgb2gray(img);
end
for i=1:size_c(1)
    for j=1:size_c(2)
       if(img(i,j)==1)
           img_output(i,j)=1;
       end
    end
    
end 

binary_img=img_output;
end

