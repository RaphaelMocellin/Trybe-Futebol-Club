const match = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 4,
  inProgress: true,
  homeTeam: 'Flamengo',
  awayTeam: 'Real Madrid',
}

const sameteams = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: 3,
  awayTeamGoals: 4,
  inProgress: true,
  homeTeam: 'Flamengo',
  awayTeam: 'Real Madrid',
}

const matches = [match]

const user = { 
  id: 1,
  username: 'Rapha Mocellin',
  email: 'rapha@rapha.com',
  password: '123456',
  role: 'admin'
};

export {
    match,
    matches,
    sameteams,
    user
}