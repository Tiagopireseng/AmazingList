from justwatch import JustWatch

just_watch = JustWatch(country='BR')
providers = just_watch.get_providers()

results = just_watch.search_for_item(
    providers=["nfx"])
# print(providers[0]["technical_name"])
# providers_dict = {provider["id"]: provider["technical_name"]
#                   for provider in providers}
# print(providers_dict)

print(results["items"][0].keys())
print(results['items'][0]['title'])
print(results['items'][2]['title'])
print(results['items'][2]['id'])
print(results['items'][2]['poster_blur_hash'])
print(results['items'][2]['scoring'][-1]['value'])
megamind = just_watch.get_title(title_id=103561)
print(megamind['short_description'])
