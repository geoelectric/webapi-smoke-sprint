webapi-smoke-sprint
===================

WebAPI Smoketest Sprint Repo

Setting up:

1. git clone this to a local directory.

2. Check out and build b2g locally. (from here, $B2G_HOME)

3. Check out and build mozilla-central locally. (from here, $MOZILLA_CENTRAL)

4. Symlink the directory from 1. to $B2G_HOME/gecko/dom/tests/mochitest/b2g-webapi-sanity

5. Edit $B2G_HOME/gecko/dom/tests/mochitest/Makefile.in and add b2g-webapi-sanity to the DIRS variable.

6. cd $B2G_HOME/objdir-gecko/dom/tests/mochitest and run 'make' -- this will update your test tree with the new files.

Running:

1. cd $B2G_HOME/gecko/testing/marionette/client and run 'python setup.py develop'. This is only needed once per system (or virtualenv)

2. cd $B2G_HOME/objdir-gecko/_tests/testing/mochitest

3. run:

python runtestsb2g.py --b2gpath $B2G_HOME --xre-path $MOZILLA-CENTRAL/obj-x86_64-unknown-linux-gnu/dist/bin --console-level INFO --emulator arm --test-path dom/tests/mochitest/b2g-webapi-sanity

Note that your xre-path might be slightly different, as the obj directory will be named after whatever architecture you built on. The above is for Ubuntu.