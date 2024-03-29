# Connect Four Game
* Two game modes available:
    * **Player vs. Player**
    * **Player vs. PC**
* If you want to play against PC, you have to choose which adversial algorithm he must use:
    * **Minimax**
    * **Alpha-beta pruning**
* Its also possible to choose the AI difficulty:
    * **Easy** (checks moves using Depth: 4)
    * **Medium** (checks moves using Depth: 6)
    * **Hard** (checks moves using Depth: 8)
* And lastly, you have to choose who plays first

## Compilation:
```
$ git clone https://github.com/Slamrap/ConnectFour.git
$ cd ConnectFour
$ make 
```

## Execution:
```
$ java ConnectFour
```

## Example:
### `Input:`
```
$ java ConnectFour

+-------------------------------------+                                                                                 
|                                     |                                                                                 
|       Welcome to Connect Four       |                                                                                 
|                                     |
+-------------------------------------+ 

+-------------------------+                                                                                            
|                         |                                                                                             
|        Game Modes       |                                                                                             
|                         |                                                                                             
+-------------------------+                                                                                             
|   1. Player vs Player   |                                                                                             
+-------------------------+                                                                                             
|   2. Player vs PC       |                                                                                             
+-------------------------+ 
Select one of the options above [1-2]: 2


+---------------------+                                                                                                 
|                     |                                                                                                 
|      Algorithms     |                                                                                                 
|                     |                                                                                                 
+---------------------+                                                                                                 
|     1. Minimax      |                                                                                                 
+---------------------+                                                                                                 
|     2. Alpha-Beta   |                                                                                                 
+---------------------+                                                                                                 
Select one of the options above [1-2]: 2


+-----------------------+                                                                                               
|                       |                                                                                               
|       Difficulty      |                                                                                               
|                       |                                                                                               
+-----------------------+                                                                                               
|  1. Easy (Depth: 4)   |                                                                                               
+-----------------------+                                                                                               
|  2. Medium (Depth: 6) |                                                                                               
+-----------------------+                                                                                               
|  3. Hard (Depth: 8)   |                                                                                               
+-----------------------+                                                                                               
Select one of the options above [1-3]: 2


+---------------------+                                                                                                 
|                     |                                                                                                 
|   Who plays first   |                                                                                                 
|                     |                                                                                                 
+---------------------+                                                                                                 
|     1. Player1      |                                                                                                 
+---------------------+                                                                                                 
|     2. PC           |                                                                                                 
+---------------------+                                                                                                
 Select one of the options above [1-2]: 2 
```
### `Output:`
```
Player1 is 'X' and PC is 'O'

================PC Turn================                                                                                   
  0   1   2   3   4   5   6                                                                                                   
 ___________________________                                                                                            
|   |   |   |   |   |   |   |                                                                                           
|---+---+---+---+---+---+---|                                                                                           
|   |   |   |   |   |   |   |                                                                                           
|---+---+---+---+---+---+---|                                                                                           
|   |   |   |   |   |   |   |                                                                                           
|---+---+---+---+---+---+---|                                                                                           
|   |   |   |   |   |   |   |                                                                                           
|---+---+---+---+---+---+---|                                                                                           
|   |   |   |   |   |   |   |                                                                                           
|---+---+---+---+---+---+---|                                                                                           
|   |   |   | O |   |   |   |                                                                                              
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                            
PC chose column: 3                                                                                                      
Movement took: 0.4204 seconds                                                                                            
Nº nodes generated: 134897                                                                                                                                                                                                               
======================================= 
```
