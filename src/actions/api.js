import SC from 'soundcloud';

export function getTracksByQuery(name, defaultLimit, defautlLinkedPartitioning, offset = 0) {
    return SC.get('/tracks', {
     q: name,  
     limit: defaultLimit, 
     offset: offset,
     linked_partitioning: defautlLinkedPartitioning
   });
 }
 
export  function dowloadEmbed(URL) {
   return SC.oEmbed(URL, { auto_play: true });
 }

 export default {
    getTracksByQuery,
    dowloadEmbed
 }