<div align="center">
  <h1>
    <br/>
    <img width="150" heigth="150" src="./public/images/chesspecker-logo.png">
    <br />
    chesspecker
    <br />
    <br />
  </h1>
  <sup>
</div>

TODO:
#### 1. Connect to app via lichess

✅ user logs in using oauth lichess

#### 2. Download games

✅ Retrieve user games using liches API : GET lichess/games/detnop\
✅ Save games in DB (check if game id already exist)

#### 3. Generates problem from your games (close to your chess level ?)

❎ Generate puzzles from games in DB\
❎ Save puzzles to DB

#### 4. Train between 20 and 100 problems

❎ Play puzzles at your level\
❎ Get a score\
❎ Train again\
❎ Add more puzzles from your games to the pool\
❎ Completely change the pool

#### 5. Practice your openings

❎ Import opening studies PGN\
❎ Parse PGN, avoid transpositions, allow only one move fo each position (FEN)\
❎ Save to DB\
❎ Compare to studyopenings to see where you went wrong
