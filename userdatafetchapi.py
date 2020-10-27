import requests
import json
import sys

user="nishitsharma0"
#user=sys.argv[1]

result= requests.get("https://codeforces.com/api/user.status?handle="+user+"&from=1&count=10000")
res=json.loads(result.content.decode('utf-8'));
verdicts={}
probs= res['result']
for i in probs:
    k= i['verdict']
    if k in verdicts:
        verdicts[k]+=1;
    else:
        verdicts[k]=1;
with open(user+'.json','w') as outfile:

    # for i in res:
    json.dump(verdicts,outfile)
