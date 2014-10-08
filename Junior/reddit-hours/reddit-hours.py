import praw
import datetime
import pygal

username = "reddit_username"

r = praw.Reddit("Reddit Comment analyizer.")

user = r.get_redditor(username)


hours = []
for i in range(0,24):
    hours.append(0)

total = 0

#Go through the comments
for c in user.get_comments(limit=None):
    date = datetime.datetime.utcfromtimestamp(c.created_utc)
    h = date.hour - 5 #Central time zone
    if h < 0:
        h = 24 + h
    #print(h)
    hours[h] += 1
    total += 1

print(hours)

bar_chart = pygal.Bar() #Make the graph
bar_chart.title = "Reddit comments by hour for " + username
bar_chart.x_title = "Hour of the day"
bar_chart.y_title = "Number of comments"
bar_chart.x_labels = map(str, range(0, 24))
bar_chart.add('Total: '+str(total), hours)
bar_chart.render_to_file(username+'_chart.svg')