webapi-smoke-sprint
===================

WebAPI Smoketest Sprint Repo

Setting up:

1. git clone this to a local directory.

2. Check out and build b2g locally.

3. Check out and build mozilla-central (desktop) locally.

4. Symlink the directory from 1. to $B2G_HOME/gecko/dom/tests/mochitest/b2g-webapi-sanity

5. Edit $B2G_HOME/gecko/dom/tests/mochitest/Makefile.in and add b2g-webapi-sanity to the DIRS variable.

6. cd $B2G_HOME/objdir-gecko/dom/tests/mochitest and run 'make' -- this will update your test tree with the new files.

Running:

1. cd $B2G_HOME/gecko/testing/marionette/client and run 'python setup.py develop'. This is only needed once per system (or virtualenv)

2. cd $B2G_HOME/objdir-gecko/_tests/testing/mochitest

3. run:


                                                            