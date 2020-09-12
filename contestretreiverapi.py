import requests
import json


result= requests.get("https://clist.by:443/api/v1/contest/?username=nishitsharm03&api_key=34bb37ac0dc7d26189a9b939cb2a5ab55ae584a0")

if result.status_code!=200:
    print('Unable to get data')
    exit()

res=json.loads(result.content.decode('utf-8'));
# print(type(result))
with open('data.json','w') as outfile:

    # for i in res:
    json.dump(res,outfile)




contests=res['objects']
print(type(contests))
names=['codechef.com','hackerearth.com','codeforces.com','leetcode.com','atcoder.com']
finallist={}
cnt=0
for i in contests:
    if i['resource']['name'] in names:
        print(i, type(i))
        finallist[cnt]=i
        cnt+=1;

for i in finallist:
    print(i)
with open('data.json','w') as outfile:

    # for i in res:
    json.dump(finallist,outfile)
