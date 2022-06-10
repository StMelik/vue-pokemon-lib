export const formatName = (name) => {
    let newName = name[0].toUpperCase() + name.slice(1)

    if (newName.includes('-')) {
        newName = newName.split('-').join(' ')
    }

    return newName
}

export const formatPokemonType = (types) => {
    return types.map(i => i.type.name).join(' / ')
}

export const formatPokemonAbilities = (abilities) => {
    const newAbilities = { 1: '', 2: '', 3: '' }

    abilities.forEach(i => newAbilities[i.slot] = formatName(i.ability.name))

    return Object.values(newAbilities)
}

export const formatPokemonStats = (stats) => {
    const newStats = {}
    stats.forEach(i => newStats[i.stat.name] = i['base_stat'])
    return newStats
}

export const formatPokemonImage = (sprites) => {
    const mainImage = sprites.other.home['front_default']
    const image2 = sprites.other['official-artwork']['front_default'];
    const image3 = sprites['front_default']

    return mainImage ? mainImage : image2 ? image2 : image3
}
