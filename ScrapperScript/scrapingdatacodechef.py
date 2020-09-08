import bs4
import requests
import re


gethtml=requests.get('https://www.codechef.com/contests/')


soup = bs4.BeautifulSoup(gethtml.text,'lxml')


extractdiv =  soup.find('table',{'class' : 'dataTable'})

#print(extractdiv)
datatable = extractdiv.find('tbody')
#print(datatable)


rowextract =datatable.find_all('tr')
finaldata=[['Contest Code','Name','Start','endtime']]
for i in range(len(rowextract)):
    columns= rowextract[i].find_all('td');
    tem=[]
    tem2=[]
    for j in range(len(columns)):
        tem.append(columns[j].text)
    for j in range(4):
        word=re.sub('[^A-Za-z0-9]+', ' ', tem[j])
        tem2.append(word)

    finaldata.append(tem2)

for i in finaldata:
    print(i)
#print(rowextract)
