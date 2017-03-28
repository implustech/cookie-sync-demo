```sh

# Demand site
DEBUG=demand:* PORT=3000 yarn start

# DSP
DEBUG=dsp:* PORT=3001 yarn start

# SSP
DEBUG=ssp:* PORT=3031 yarn start

# Inventory
DEBUG=inventory:* PORT=3030 yarn start

```

### Flow

1. After you run the above commands, open `locahost:3000`

2. You will see 2 books, at this time no cookie involved

3. After you click one of the book, pixel will be fired to DSP and DSP will create a DSP id cookie. Meanwhile DSP will response back a pixel asking for cookie sync with SSP

4. SSP get the user cookie and sync with DDP, after that redirect back to demand side and DSP

5. Open `localhost:3030` which is a publisher (inventory) site, you will see the book is suggested.
