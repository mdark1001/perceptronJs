import numpy as np #  import numpy
import cv2 as cv;  # import cv2 package
from matplotlib import pyplot as plt
from skimage.feature import canny;
from scipy import ndimage

class PDI:
    file_dir='./img/'
    array_image_data=[]

    def version(self):
        print cv.__version__;

    def read(self,name_image):
        full_path=str(self.file_dir+name_image)
        img=cv.imread(full_path,cv.IMREAD_GRAYSCALE);
        #img=cv.resize(img, (64, 64))
        return img

    def array_img(self,name,size_array):
        i=1;
        self.array_image_data=[];
        while i<=size_array:
            img=self.read(name+str(i)+".png");
            if (type(img) is np.ndarray):
                print "Img valid!"
                self.array_image_data.append(img)
            else:
                print "Error read image"+name;
            i=i+1
        return self.array_image_data;

    def img2binary(self,img):
        img = cv.medianBlur(img,5)
        ret,th1 = cv.threshold(img,120,255,cv.THRESH_BINARY)
        th2 = cv.adaptiveThreshold(img,255,cv.ADAPTIVE_THRESH_MEAN_C,\
                    cv.THRESH_BINARY,11,2)
        th3 = cv.adaptiveThreshold(img,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,\
                    cv.THRESH_BINARY,11,2)
        titles = ['Original Image', 'Global Thresholding (v = 120)',
                    'Adaptive Mean Thresholding', 'Adaptive Gaussian Thresholding']
        images = [img, th1, th2, th3]
        for i in xrange(4):
            plt.subplot(2,2,i+1),plt.imshow(images[i],'gray')
            plt.title(titles[i])
            plt.xticks([]),plt.yticks([])
        plt.show()
        return th2;
    def segmentacion_hist(self,img):
        np.random.seed(1)
        n = 20
        l = 256
        im = np.zeros((l, l))
        points = l*np.random.random((2, n**2))
        im[(points[0]).astype(np.int), (points[1]).astype(np.int)] = 1
        im = ndimage.gaussian_filter(img, sigma=l/(4.*n))

        mask = (im > im.mean()).astype(np.float)

        mask += 0.1 * im

        #img = mask + 0.2*np.random.randn(*mask.shape)

        hist, bin_edges = np.histogram(img, bins=60)
        bin_centers = 0.5*(bin_edges[:-1] + bin_edges[1:])

        binary_img = img > 0.5

        plt.figure(figsize=(11,4))

        plt.subplot(131)
        plt.imshow(img)
        plt.axis('off')
        plt.subplot(132)
        plt.plot(bin_centers, hist, lw=2)
        plt.axvline(0.5, color='r', ls='--', lw=2)
        plt.text(0.57, 0.8, 'histogram', fontsize=20, transform = plt.gca().transAxes)
        plt.yticks([])
        plt.subplot(133)
        plt.imshow(binary_img, cmap=plt.cm.gray, interpolation='nearest')
        plt.axis('off')

        plt.subplots_adjust(wspace=0.02, hspace=0.3, top=1, bottom=0.1, left=0, right=1)
        plt.show()
        return binary_img
    def create_file(self,name,data):
            #data=self.img2binary(data);
            med_denoised = cv.medianBlur(data, 3)
            med_denoised=self.segmentacion_hist(med_denoised);
            flujo=canny(med_denoised,3,0.3,0.2);
            #flujo=data;
            plt.imshow(med_denoised,'gray');
            plt.xticks([]), plt.yticks([])
            plt.show()
            filedata = open(name,"w")
            for i in flujo:
                for j in i:
                #    print int(j);
                    filedata.write(str(int(j)));
                filedata.write("\n");
