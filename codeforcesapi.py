import requests
import json
import random
tag=sys.args[1]

ratedlow=sys.args[2]
ratedhigh = sys.args[3]

callurl=""
for i in range(len(alltags)):
    if(i==0):
        callurl=callurl + "tags="+alltags[i]
    else:
        callurl=callurl + "&tags="+alltags[i]
result=requests.get("https://codeforces.com/api/problemset.problems?"+tag)
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
    print( selectedprob)
    print('link to the problem:','https://codeforces.com/contest/'+ str(selectedprob['contestId'])+'/problem/'+str(selectedprob['index']))
else:
    print('No such problem found')
