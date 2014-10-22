import random

currpop = 20

for year in range(40):
    print("Year:", year + 1)
    print("Initial", currpop)
    
    deaths = 0
    births = 0
    
    for lemming in range(currpop):
        fate = random.randint(1,6)
        if fate == 3 or fate == 6:
            births += 1
        elif fate == 1:
            deaths += 1
    
    print("Births:", births)
    print("Deaths:", deaths)
    newpop = (currpop + births) - deaths
    
    print("Change:", births - deaths)
    print("Final:", newpop)
    print("")
    
    currpop = newpop
    
    if currpop > 500:
        break