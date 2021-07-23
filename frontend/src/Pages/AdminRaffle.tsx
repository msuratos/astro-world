import { useEffect, useState } from "react";

const AdminRaffle = () => {
  const usersString = sessionStorage.getItem('users');
  const users: any[] = JSON.parse(usersString!)
  const [user, setUser] = useState(users[0].displayName);
  const [winners, setWinners] = useState<any[]>([]);
  const [showWinner, setShowWinner] = useState(false);

  const calculateWinner = () => {
    let usersWithRecords: any[] = [];

    users.forEach((val) => {
      val.images.forEach((imageVal: any) => {
        usersWithRecords.push({ displayName: val.displayName, imageId: imageVal.imageId });
      });
    });

    usersWithRecords = shuffleArray(usersWithRecords);

    let winnerList = [];
    for (let i = 0; i < 5; i++) {
      const getWinner = () => {
        const winnerIndex = Math.round(Math.random() * (usersWithRecords.length - 1));
        return usersWithRecords[winnerIndex].displayName;
      };

      let winnername = getWinner();
      
      while(winnername === winnerList.find(value => value === winnername))
        winnername = getWinner();
      
      winnerList.push(winnername);
    }
    setWinners(winnerList);
    setShowWinner(true);
  };

  const shuffleArray = (array: any[]) => {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = Math.round(Math.random() * (users.length - 1));
      const tempUser = users[index]?.displayName;

      if (tempUser)
        setUser(tempUser);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      calculateWinner();
    }, 5000);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {!showWinner &&
        (
          <>
            <h2>Winner is...</h2>
            <section>{user}</section>
          </>
        )
      }
      {showWinner &&
        (
          <>
            <h2 style={{color: 'var(--success)'}}>Winners!</h2>
            {
              winners.map((val, index) => {
                return <section key={`winner-section-${index}`}>{index+1}. {val}</section>
              })
            }
          </>
        )
      }
    </div>
  );
};

export default AdminRaffle;