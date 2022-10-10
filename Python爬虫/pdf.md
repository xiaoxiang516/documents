wps的pdf会员限制功能的破解

# [pdf.js使用全教程(开发笔记)](https://blog.csdn.net/meisnb/article/details/115183049)


# 利用Python代码处理PDF文件
偶偶
偶偶
人生海海，愿我们都有帆有岸
PDF格式的文件因为易于存储、传输、占用内存小的特点被广泛应用，但是实际的工作中，我们需要对一些PDF文件进行修改、编辑、格式调整等。目前的很多PDF阅读器会提供部分功能，但是很多是充值后才允许使用。

作为代码爱好者，怎么会允许这种情况。

下面我们用代码的形式来实现PDF编辑的部分功能，希望对有Python 基础的小伙伴有所帮助。

暂时整理了，PDF文件合并、拆分、生成水印、合成水印（单页、文件、批量文件）等。

主要依托于PyPDF2 、reportlab 这两个包实现。

1、 PDF文件合并

这个功能其实很多的编辑器里面都会提供了，如WPS、极速PDF、迅读PDF等（是不是有广告的嫌疑）。

python 代码处理如下：

1.1 多个PDF文件整体合并

#多个PDF文件整体合并

from PyPDF2 import PdfFileReader,PdfFileWriter

reader1=PdfFileReader(r'C:\Users\Desktop\file1.pdf') # 文件路径
reader2=PdfFileReader(r'C:\Users\Desktop\file2.pdf')
#  reader3=PdfFileReader(r'C:\Users\Desktop\XX.pdf')
#  reader4=PdfFileReader(r'C:\Users\Desktop\XX.pdf')

num1=reader1.getNumPages()
num2=reader2.getNumPages()
#num3=reader3.getNumPages()
#num4=reader4.getNumPages()

print('第一个文件的页数：',num1)
print('第二个文件的页数：',num2)
writer=PdfFileWriter()

for index in range(num1):
    page=reader1.getPage(index)
    writer.addPage(page)
    
for index in range(num2):
    page=reader2.getPage(index)
    writer.addPage(page)

'''
for index in range(num3):
    page=reader3.getPage(index)
    writer.addPage(page)
    
for index in range(num4):
    page=reader4.getPage(index)
    writer.addPage(page)
'''
num=writer.getNumPages()
print('合并后的文件页数:',num)

writer.write(open(r'C:\Users\Desktop\new.pdf','wb'))
1.2 选取2个以上PDF文件中的个别页，然后合并

from PyPDF2 import PdfFileReader,PdfFileWriter

reader1=PdfFileReader(r'C:\Users\Desktop\file1.pdf') # 文件路径
reader2=PdfFileReader(r'C:\Users\Desktop\file2.pdf')
#  reader3=PdfFileReader(r'C:\Users\Desktop\XX.pdf')

# 选取需要合并的页码# 选取需要合并的页码
pages1=[1,4,6] # 第一个文件的页码
pages2=[2,3,4] # 第二个文件的页码

#建立1个writer对象
writer=PdfFileWriter()


for index in pages1:
    page=reader1.getPage(index)
    writer.addPage(page)
    
for index in pages2:
    page=reader2.getPage(index)
    writer.addPage(page)
    
num=writer.getNumPages()
print('合并后的文件页数:',num)


writer.write(open(r'C:\Users\zhang.shr\Desktop\new1.pdf','wb'))
2. 添加水印

2.1 生成水印

首先需要准备字体（水印生成汉字的，英文字体不需要）。

from reportlab.pdfbase import pdfmetrics    #注册字体
from reportlab.pdfbase.ttfonts import TTFont  #字体类
from reportlab.pdfgen import canvas   #创建pdf文件

pdfmetrics.registerFont(TTFont('fs',r"D:\python\字体\仿宋_GB2312.ttf")) #  确定字体路径，设置字体名称

file_water=canvas.Canvas('water.pdf') # 新建一个water文件

file_water.setFont('fs',50) #设置字体大小

file_water.setFillColorRGB(255,0,0,0.1)# 设置字体颜色，RGB组合。最后一个参数是透明度

file_water.rotate(45) #设置旋转角度

file_water.drawString(500,100,'天 天 向 上') #渲染字体，字体位置，及字体内容


file_water.save() # 保存
2.2 给文件中的某一页添加水印

from PyPDF2 import PdfFileReader,PdfFileWriter

reader_file=PdfFileReader(r'C:\Users\Desktop\file.pdf')
reader_water=PdfFileReader('water.pdf')

#准备好2个页面
page0=reader_file.getPage(1)  # 取出需要添加水印的页
water_page=reader_water.getPage(0) #取出水印页

page0.mergePage(water_page) #合并水印和文件

writer=PdfFileWriter()  # 新建一writer对象
writer.addPage(page0)

writer.write(open(r'C:\Users\Desktop\new.pdf','wb'))
2.3 给文件中的所有页添加水印

from PyPDF2 import PdfFileReader,PdfFileWriter


reader_file=PdfFileReader(r'C:\Users\zhang.shr\Desktop\电信网.pdf')
reader_water=PdfFileReader('water.pdf')

water_page=reader_water.getPage(0)
num=reader_file.getNumPages()

writer2=PdfFileWriter()

for index in range(num):
    page=reader_file.getPage(index)
    page.mergePage(water_page)
    writer2.addPage(page)
writer2.write(open(r'C:\Users\zhang.shr\Desktop\333.pdf','wb'))
2.4 批量添加水印

import os
from PyPDF2 import PdfFileReader,PdfFileWriter

print(os.listdir(r'C:\Users\Desktop\input'))

path='C:/Users/Desktop/input/'      #需要处理的文件夹路径
all_files=os.listdir(path)  #取出此文件下所有的文件
water_page=PdfFileReader('water.pdf').getPage(0) #取出水印页
writer=PdfFileWriter()    #建立一个writer对象

#遍历文件下下的每一个文件
for i in all_files:
    
    if i[-3:]!='pdf':  #筛选出非PDF文件，不处理
        continue
    
    path_file=path+i
    
    reader=PdfFileReader(path_file)
    
    writer=PdfFileWriter()
    
    num=reader.getNumPages()
    
    #遍历每个文件的每一页
    for index in range(num):
        page=reader.getPage(index)
        page.mergePage(water_page)
        writer.addPage(page)
                       
    writer.write(open('C:/Users/Desktop/output/'+i,'wb'))
以上代码都亲测有效，拿来即可用。

希望对需要的小伙伴有所帮助。

编辑于 2022-05-19 15:41
Python