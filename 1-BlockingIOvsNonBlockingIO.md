# BLOCKING I/O vs NON BLOCKING I/O

## I - CPU vs I/O

 ## 1 - CPU
Le processeur c'est l'unité central de traitement sur un ordinateur

Son rôle : 

* Recherche des instructions en mémoire
* Decodage des instructions
* Recherche des opérandes
* Execution des résultats 
* Rangement en memoire des calculs
 
 ## 2 - I/O

C'est une interface qui au permet au processeur un échange d'informations entre le CPU et les périphériques qui lui sont associés

* Entrées : 
  Péripheriques (clavier,disque, etc....) --------> CPU

* Sorties:
  CPU -------------> Périphériques (clavier,db,fichier,etc....)


 ## 3 - CPU/bound  vs I/O bound
 * Une tâche est dite CPU/bound lorsque cette dernière nécessite beaucoup de calcul CPU, exple : redimensionner une image, un algorithme de machine learning

 * En revanche, elle est dite I/O bound lorsqu'elle nécessite beaucoup d'entrée sortie (ecriture dans un fichier - appel réseau http - base de données)



## II  - Blocking I/O vs Non Blocking I/O

### 1 - Blocking I/O

![Alt text](/images/request-server.png "a title")


![Alt text](/images/single-thread.png "a title")


![Alt text](/images/multiple-thread-server.png "a title")


![Alt text](/images/multithread-blocking-io.png "a title")


### 1-1 Processus et Thread
| **Aspect**    | **Thread**                                                                   | **Processus**                                     |
|---------------|-----------------------------------------------------------------------------|--------------------------------------------------|
| **Définition** | Une unité légère d'exécution au sein d'un processus.                       | Une instance isolée d'un programme en cours d'exécution. |
| **Mémoire**    | Partage la mémoire et les ressources avec d'autres threads du même processus. | A une mémoire dédiée, isolée des autres processus.         |
| **Isolation**  | Faible (peut accéder aux données des autres threads du même processus).     | Forte (ne peut pas accéder aux données des autres processus). |
| **Légèreté**   | Moins coûteux en termes de ressources.                                     | Plus coûteux (en termes de CPU, mémoire, etc.).            |




### 2 - Non Blocking I/O

![Alt text](/images/event-loop-non-blocking.png "a title")


![Alt text](/images/non-blocking-io.png "a title")