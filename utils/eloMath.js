const K = 40

export const probabilityOfWinning = (Ra, Rb) => {
  const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400))
  const Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400))

  return [Ea, Eb]
}

export const matchPoints = (Ra, Ea, S) => {
  return Math.round(((Ra + K * (S - Ea)) * 10) / 10)
}

export const getPercent = (x) => {
  return (Math.round(x * 1000) / 10).toFixed(0)
}