export function uniqueChannelList (channelList) {
    return Array.from(new Set(channelList.map(channel => channel.category))).sort();
}