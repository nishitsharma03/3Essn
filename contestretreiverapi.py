import requests
import json


result= requests.get("https://clist.by:443/api/v1/contest/?username=nishitsharm03&api_key=34bb37ac0dc7d26189a9b939cb2a5ab55ae584a0")
if result.status_code!=200:
    print('Unable to get data')
    exit()

res=json.loads(result.content.decode('utf-8'));

# for i in res["objects"]:
#     print(i)


contests=res['objects']

names=['codechef.com','hackerearth.com','codeforces.com','leetcode.com','atcoder.com']

finallist=[]
for i in contests:

    if i['resource']['name'] in names:
        finallist.append(i)

for i in finallist:
    print(i['resource']['name'],i['event'],i['duration'])

