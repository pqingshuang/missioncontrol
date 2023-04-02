const pool = new NostrTools.SimplePool()

let relays = []



let sub = pool.sub(
    [...relays, 'wss://nostr.688.org'],
    [
        {
            //tags: [['#e', 'fd459ea06157e30cfb87f7062ee3014bc143ecda072dd92ee6ea4315a6d2df1c']]
            "#e": "fd459ea06157e30cfb87f7062ee3014bc143ecda072dd92ee6ea4315a6d2df1c",
            kinds: [10310]
            // authors: [
            //     "b4f36e2a63792324a92f3b7d973fcc33eaa7720aaeee71729ac74d7ba7677675"
            //     //NostrTools.nip19.decode("npub1mygerccwqpzyh9pvp6pv44rskv40zutkfs38t0hqhkvnwlhagp6s3psn5p").data
            // ]
        }
    ]
)


sub.on('event', event => {
    let j = JSON.parse(event.content)
    enMapState(event)
    waitForStateReady(()=>{
        if (storedPubkey === "" || !storedPubkey) {
            window.nostr.getPublicKey().then(x=>{
                storedPubkey = x
            })
        }
        document.getElementById("content").replaceChildren()
        
        identities().forEach(i => {
            document.getElementById("content").appendChild(makePerson(i))
        })
    })
})

function makePerson(identity) {
    let p = document.createElement("div")
    p.appendChild(makeH3(identity.Name))
    p.appendChild(makeItem("About", identity.About))
    p.appendChild(makeItem("Account", identity.Account))
    p.appendChild(makeItem("Added By", identity.UniqueSovereignBy))
    return p
}

function makeItem(key, value) {
    let d = document.createElement("div")
    d.appendChild(makeText(key + ": "))
    d.appendChild(makeText(value))
    return d
}

function makeText(text) {
    let s = document.createElement("span")
    s.innerText = text
    return s
}

function makeH3(title) {
    h3 = document.createElement("h3")
    h3.className = "is-3"
    h3.innerText = title
    return h3
}