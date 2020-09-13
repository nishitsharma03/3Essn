import requests
import json
import random
tag=input('enter problem tag')
rated=int( input('enter problem rating'))

result=requests.get("https://codeforces.com/api/problemset.problems?tags="+tag)
#print(result.headers['status'])
if( result.status_code!=200):
    exit();


allprob=[]
res=json.loads(result.content.decode('utf-8'));
#print (res)
j = res['result']['problems']

for  i in j:
    #print(i)
    if 'rating' in i:
        if i['rating']==rated:
            allprob.append(i)

random.shuffle(allprob)

selectedprob = {}
for i in allprob:
    if 'contestId' in i:
        selectedprob = i;
        break;
if(len(selectedprob)):
    print( selectedprob)
    print('link to the problem:','https://codeforces.com/contest/'+ str(selectedprob['contestId'])+'/problem/'+str(selectedprob['index']))
else:
    print('No such problem found')
