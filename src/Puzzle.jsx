import React, {useState} from 'react';

function Puzzle() {
    const [showAnswer, toggleAnswer] = useState(false);
    const onClickToggleAnswer = () => {
        toggleAnswer(!showAnswer)
    }
    return (
        <div>
            <h3>I absolutely love all sorts of puzzles so try and solve one my favorites!</h3>
            <h4>The King of a small country invites 1000 senators to his annual party. As a tradition, each senator
                brings the King a bottle of wine. Soon after, the Queen discovers that one of the senators is trying to
                assassinate the King by giving him a bottle of poisoned wine. Unfortunately, they do not know which
                senator, nor which bottle of wine is poisoned, and the poison is completely indiscernible. However, the
                King has 10 prisoners he plans to execute. He decides to use them as taste testers to determine which
                bottle of wine contains the poison. The poison when taken has no effect on the prisoner until exactly 24
                hours later when the infected prisoner suddenly dies. The King needs to determine which bottle of wine
                is poisoned by tomorrow so that the festivities can continue as planned. Hence he only has time for one
                round of testing. How can the King administer the wine to the prisoners to ensure that 24 hours from now
                he is guaranteed to have found the poisoned wine bottle?</h4>
            <button className={'button'} onClick={onClickToggleAnswer}>View Solution</button>
            {showAnswer ? <h4>
                <ol>
                    <li>Label the prisoners (A-J) and the wine bottles (0-999)</li>
                    <li>Prisoner A drinks from every other bottle (0, 2, 4...), B from every other set of 2 bottles (0,
                        1, 4, 5...), C from every other set of 4 bottles (0, 1, 2, 3, 8, 9, 10, 11...) and so on (powers
                        of 2)
                    </li>
                    <li>Wait 24 hours to see which prisoner was poisoned. A prisoner can have 2 states (0 = alive, 1 =
                        dead)
                    </li>
                    <li>Line up prisoners from J {"->"} A and give them their value (i.e. 0000000001)</li>
                    <li>Translate this from a binary number to a decimal and that is the bottle that is poisoned.
                        (0000000001 = bottle #1, 0101010101 = 256 + 64 + 16 + 4 + 1 = Bottle #341)
                    </li>
                    <li>For a more in-depth solution look up "A King, 1000 Bottles of Wine, 10 Prisoners and a Drop of
                        Poison." Hope you enjoyed the puzzle!
                    </li>
                </ol>
            </h4> : null}
        </div>
    );
}

export default Puzzle;