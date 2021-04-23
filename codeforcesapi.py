import requests
import json
import random
import sys
tag=sys.argv[1]

ratedlow=int(sys.argv[2])
ratedhigh = int(sys.argv[3])
alltags=list(tag.split(","))
callurl=""
for i in range(len(alltags)):
    if(i==0):
        callurl=callurl + "tags="+alltags[i]
    else:
        callurl=callurl + ";"+alltags[i]
result=requests.get("https://codeforces.com/api/problemset.problems?"+callurl)
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
        if i['rating']>=ratedlow and i['rating']<=ratedhigh:
            allprob.append(i)

random.shuffle(allprob)

selectedprob = {}
for i in allprob:
    if 'contestId' in i:
        selectedprob = i;
        break;
if(len(selectedprob)):
    # print(selectedprob)
    print( selectedprob["name"], end="|")
    print( selectedprob["rating"], end="|")
    print('https://codeforces.com/contest/'+ str(selectedprob['contestId'])+'/problem/'+str(selectedprob['index']))
else:
    print('No such problem found Please Try Again!')
