## New York City Leading Causes of Death From 2007 to 2014


## Introduction

This is WPI CS573 Data Visualization final project. There are several leading causes of death in New York City presented with details by using D3.js. The video about this project is here.

## Project URL

https://echomelodylwh.github.io/dataviz-project/

## Data Source

The data I propose to visualize for my project is [New York City Leading Causes of Death](https://data.cityofnewyork.us/Health/New-York-City-Leading-Causes-of-Death/jb7j-dtam), which contains 1094 rows and 7 columns. Then we select related features by pre-processing the data.

## Descriptions of Visualization and Interactions

This project implements responsive web design which makes web pages render well on a variety of devices and window or screen sizes.

The visualization can be divided into two part. (1) The stacked area chart in the left panel represents the total of all the diseases plotted from 2007 to 2014. The X-axis represents the year and Y-axis represents the percentage of each disease account for overall deaths. (2) The multi-series line chart in the right panel represents the deaths or death rate change during 2007 to 2014 for each race ethnicity and sex. The X-axis represents the year and Y-axis represents the deaths or death rate which is determined by the radio choice.

Above these two chart, the disease user selected in the stacked area chart  will be displayed in  a sentence. Meanwhile, user can select to display the deaths or death rate in the right panel.

In the stacked area chart in the left panel, user can select the disease he/she want to be updated on the right panel by click the area of this disease and the result will be displayed on above.


Figure 1
![image](https://github.com/echomelodylwh/dataviz-project/blob/master/thumbnail.png)

## Answered questions and discussions

Question 1 :  From 2007 to 2014, How does the total death number or death rate for each disease vary over time?

Answer 1  :  Since the stacked area chart only represents the percentage of each disease account for overall deaths, it can not illustrate the total death number vary over time.

Question 2 : Is there any disease become the dominate one causing death between 2007 to 2014?

Answer 2 : As the Figure 1 shown above, we can find the Malignant Neoplasms could be the dominate one because it still accounts for the largest percentage during this time.

Question 3 : What is the distribution of races and gender between 2007 to 2014 for each disease?

Answer 3 :  When comes to the Malignant Neoplasms, for the death rate as shown in Figure 3.1, we can find there are four ethnic data with sex. The white non-hispanic accounts for a large percentage when comparing with other ethnic.

For the number of deaths as shown in Figure 3.2, the white non-hispanic still accounts for a large percentage when comparing with other ethnic.

Figure 3.1
![image](https://github.com/echomelodylwh/dataviz-project/blob/master/Figure3.1.png)

Figure 3.2
![image](https://github.com/echomelodylwh/dataviz-project/blob/master/Figure3.2.png)


There are other diseases information displayed below.

Influenza (Flu) and Pneumonia
![image](https://github.com/echomelodylwh/dataviz-project/blob/master/Influenza%20(Flu)%20and%20Pneumonia.png)

Diabetes Mellitus
![image](https://github.com/echomelodylwh/dataviz-project/blob/master/Diabetes%20Mellitus.png)

Chronic Lower Respiratory Diseases
[image](https://github.com/echomelodylwh/dataviz-project/blob/master/Chronic%20Lower%20Respiratory%20Diseases.png)






