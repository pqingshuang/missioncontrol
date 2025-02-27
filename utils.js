// var mindmachineSocket = new WebSocket(relays);
async function signAsynchronously(event) {
    event.id = window.NostrTools.getEventHash(event)
    if (!window.nostr) {
        alert('Nostr extension not found.')
    } else if (window.nostr) {
        let signatureOrEvent = await window.nostr.signEvent(event)
        switch (typeof signatureOrEvent) {
            case 'string':
                event.sig = signatureOrEvent
                break
            case 'object':
                event.sig = signatureOrEvent.sig
                break
            default:
                throw new Error('Failed to sign with Nostr extension.')
        }
    }
    return event
}
function makeEvent(note, tags, kind, pubkey) {
    var now = Math.floor((new Date().getTime()) / 1000);
    k = 1
    if (kind !== undefined) {
        k = kind
    }
let event = {
    kind: kind,
    pubkey: pubkey,
    created_at: now,
    tags: tags,
    content: note
  }
  console.log(event)
  event.id = window.NostrTools.getEventHash(event)
return event
}
async function sendEventToRocket(content, tags, kind, pubkey) {
    let et
    if (typeof pubkey !== "string") {
        et = makeEvent(content, tags, kind, storedPubkey)
    } else {
        et = makeEvent(content, tags, kind, pubkey)
    }
    console.log(et,pool)
    let pubs = pool.publish([...relays, 'wss://nostr.688.org'], et)
    pubs.on('ok', () => {
        // this may be called multiple times, once for every relay that accepts the event
        // ...
        console.log("published")
        return 'ok!'
      })
    pubs.on('failed', reason => {
        console.log(`failed to publish to {relay.url}: ${reason}`)
        return 'failed><'
      })

}

