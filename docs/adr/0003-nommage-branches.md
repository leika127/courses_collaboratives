# ADR 0003 · Nommage de branches
# Statut : accepté, le 14/10/2026.

## Contexte:
L'équipe est composée de 3 personnes, nous avons décidé de fixer un format pour le nommage de branches du projet.

## Décision:
Nous avons choisi d'utiliser Gitflow afin de garantir une plus grande stabilité en conséquence nos branches seront créées à partir de notre branche dev avec le format suivant (classique):

 - feat/*nom-de-la-branche* pour les nouvelles fonctionnalité
 - fix/*nom-de-la-branche* correction des bugs
 - docs/*nom-de-la-branche* documentation uniquement
 - style/*nom-de-la-branche* mise en forme
 - refactor/*nom-de-la-branche* réorganisation du code sans nouvelle fonctionnalité
 - test/*nom-de-la-branche* ajout ou modification des tests
 - chore/*nom-de-la-branche* maintenance,config,dépendances

## Conséquences:
Le type de la branche correspond aux types de commit de l'ADR 0002.
L'historique et les PR sont lisibles et faciles à lire.