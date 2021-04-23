import bs4
import requests
import re


gethtml=requests.get('https://atcoder.jp/home')


soup = bs4.BeautifulSoup(gethtml.text,'lxml')


extractdiv =  soup.find('div',{'id' : 'contest-table-upcoming'})

#print(extractdiv)
datatable = extractdiv.find('table',{'class': 'table'})
#print(datatable)


rowextract =datatable.find_all('tr')
finaldata=[['start time','contest name']]
for i in range(len(rowextract)):
    columns= rowextract[i].find_all('td');
    tem=[]
    tem2=[]
    for j in range(len(columns)):
        tem.append(columns[j].text)
    if(len(tem)<2):
        continue;
    for j in range(2):
        word=tem[j]#re.sub('[^A-Za-z0-9]+', ' ', j)
        tem2.append(word[j::])

    finaldata.append(tem2)

for i in finaldata:
    print(i)
#print(rowextract)
