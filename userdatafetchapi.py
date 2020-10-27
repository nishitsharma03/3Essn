import requests
import json
import sys

user="nishitsharma0"
#user=sys.argv[1]

result= requests.get("https://codeforces.com/api/user.status?handle="+user+"&from=1&count=10000")
res=json.loads(result.content.decode('utf-8'));
verdicts={}
tags={}
probs= res['result']
for i in probs:
    k= i['verdict']
    if k in verdicts:
        verdicts[k]+=1;
    else:
        verdicts[k]=1;
    if k=="OK":
        for j in i['problem']['tags']:
            if j in tags:
                tags[j]+=1
            else:
                tags[j]=1;


with open('submissionStatus.json','w') as outfile:

    # for i in res:
    json.dump(verdicts,outfile)
with open('problemPerTag.json','w') as outfile:

    # for i in res:
    json.dump(tags,outfile)
