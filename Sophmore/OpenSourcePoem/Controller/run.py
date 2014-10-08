import pusher
p = pusher.Pusher(app_id='', key='', secret='')


def getHTML(num):
    return open('templates/' + str(num) + '.html').read()

def updateCurrent(html):
    f = open('current.html','w')
    f.write(html)
    f.close()

start = 0
while True:
    h = getHTML(start)
    updateCurrent(h)
    if start != 14:
        p['main'].trigger('update-html', {'html': h})
    else:
        p['main'].trigger('end', {})

    print 'Sent update #'+str(start)
    start+= 1
    wait = raw_input()



