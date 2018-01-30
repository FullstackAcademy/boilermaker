export function uniqueChannelList (channelList) {
    const unique = Array.from(new Set(channelList.map(channel => channel.category))).sort();
    return unique
}